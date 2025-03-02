import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format, addDays, addYears } from 'date-fns';

import {
  AllCheckboxContStyled,
  AllInputContStyled,
  FormStyled,
  SubmitButton,
} from './ByParameters.styled';
import GeneralSelect from '../GeneralSelect/GeneralSelect';
import { GeneralCheckbox } from '../GeneralCheckbox/GeneralCheckbox';
import {
  vehicleGroupsOptions,
  selectAutoCategory,
  // isDev,
} from '../../helpers/ByParameters/selectOptions';
import HelperImg from '../HelpCircle/HelperImg/HelperImg';
import HelperList from '../HelpCircle/HelperList/HelperList';
import { useActions } from '../../hooks/useActions';
import {
  DATE_MESSAGE_ERRORS,
  ORDER_TYPE,
  PRIVILEGED_TYPE,
  REGISTRATION_TYPES,
  VEHICLES_TYPES,
} from '../../constants';

import CustomLabel from '../CustomLabel/CustomLabel';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import {
  validateContractOtkDate,
  validateContractStartDate,
} from '../../helpers/formValidationSchema';
import { normalizeDate } from '../../helpers/normalizeDate';
import { useErrorHandler } from '../../context/ErrorProvider';

const ByParameters = () => {
  const navigate = useNavigate();
  const handleError = useErrorHandler();
  const locationPath = useLocation();
  const {
    setEngineCapacity,
    setVehicle,
    setQueryText,
    getAddress,
    setAddressOptions,
    setAddress,
    setSubmitObj,
    setStateNumber,
    setAutoMakers,
    setAutoByNumber,
    setAutoModelByMaker,
    setTariffPolicyChoose,
    setTariffVcl,
    // setRefError,
    // setIsModalErrorOpen,
  } = useActions();

  const {
    queryText,
    addressOptions: allAddress,
    address,
    vehicle,
    engineCapacity,
    foreignNumber,
    benefits,
    submitObj: { registrationType },
  } = useSelector((state) => state.byParameters);

  const handleChangeVehicle = (option) => {
    setVehicle(option);
    setEngineCapacity(selectAutoCategory(option.value)[0]);
  };

  const handleChangeVehicleSubtype = (e) => {
    setEngineCapacity(e);
  };

  const handleChangeQueryText = (value) => {
    setQueryText(value.trim());
    if (value) {
      getAddress(value);
    }
    if (!value) {
      setAddressOptions([]);
    }
  };

  const changeAddress = (selectOption) => {
    if (queryText) {
      setAddress(selectOption);
    }
  };

  const formik = useFormik({
    initialValues: {
      benefits,
      foreignNumber,
      dateFrom: format(addDays(new Date(), 1), 'dd/MM/yyyy'),
      otk: registrationType === REGISTRATION_TYPES.PERMANENT_WITH_OTK,
      registrationType: REGISTRATION_TYPES.PERMANENT_WITHOUT_OTK,
    },
    validate: (values) => {
      try {
        const schemaOptions = {
          dateFrom: validateContractStartDate(),
        };
        if (values.otk) {
          schemaOptions.otkDate = validateContractOtkDate();
        }
        const schema = Yup.object(schemaOptions);
        schema.validateSync(values, { abortEarly: false });
        return {};
      } catch (errors) {
        const validationErrors = {};
        errors.inner?.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        return validationErrors;
      }
    },
    // validateOnChange: false,
    onSubmit: (values) => {
      let sendObj = {
        customerCategory: values.benefits
          ? PRIVILEGED_TYPE.PRIVILEGED
          : PRIVILEGED_TYPE.NATURAL,
        autoCategory: engineCapacity.value,
        outsideUkraine: values.foreignNumber,
        usageMonths: 0,
        taxi: false,
        dateFrom: normalizeDate(values.dateFrom),
        registrationType: values.registrationType,
      };
      if (address.value) {
        sendObj.registrationPlace = address.value;
      }
      if (values.otkDate) {
        sendObj.otkDate = normalizeDate(values.otkDate);
      }

      setSubmitObj(sendObj);
      setStateNumber('');
      setAutoMakers([]);
      setAutoByNumber([]);
      setAutoModelByMaker([]);
      setTariffPolicyChoose([]);
      setTariffVcl([]);
      navigate('/prices', {
        state: {
          from: locationPath,
          params: sendObj,
          type: ORDER_TYPE.BY_PARAMS,
        },
      });
    },
  });

  engineCapacity.value === 'B5'
    ? (formik.values.benefits = false)
    : formik.values.benefits;

  const { setValues, values } = formik;

  useEffect(() => {
    setValues((p) => ({
      ...p,
      otk: VEHICLES_TYPES[engineCapacity.value].otkRequired,
    }));
  }, [engineCapacity, setValues]);

  useEffect(() => {
    if (values.otk) {
      setValues((p) => ({
        ...p,
        registrationType: REGISTRATION_TYPES.PERMANENT_WITH_OTK,
        otkDate: format(addDays(addYears(new Date(), 1), 1), 'dd/MM/yyyy'),
      }));
    } else {
      setValues((p) => {
        // eslint-disable-next-line
        const { otkDate, registrationType, ...rest } = p;
        return {
          ...rest,
          registrationType: REGISTRATION_TYPES.PERMANENT_WITHOUT_OTK,
        };
      });
    }
  }, [setValues, values.otk]);

  const isPrivileged =
    engineCapacity.value === 'B5' ||
    engineCapacity.value.startsWith('C') ||
    engineCapacity.value === 'E' ||
    engineCapacity.value === 'F' ||
    values.foreignNumber ||
    values.otk;

  return (
    <div>
      <FormStyled
        onSubmit={(e) => {
          try {
            e.preventDefault();
            formik.handleSubmit(e);
          } catch (error) {
            handleError(error, {
              component: ByParameters.name,
              cb: 'onSubmit',
            });
          }
        }}
      >
        <AllInputContStyled>
          <GeneralSelect
            id="vehicle"
            lableText="Транспортний засіб"
            optionsArr={vehicleGroupsOptions}
            changeCB={handleChangeVehicle}
            currentValue={vehicle}
            className={'baseLine'}
          />
          <div>
            <GeneralSelect
              id="engineCapacity"
              lableText="Об’єм двигуна"
              optionsArr={selectAutoCategory(vehicle.value)}
              changeCB={handleChangeVehicleSubtype}
              currentValue={engineCapacity}
              className={'baseLine'}
            />

            {VEHICLES_TYPES[engineCapacity.value].otk && (
              <>
                <GeneralCheckbox
                  lableText="ОТК"
                  labelColor={'#ffffff!important'}
                  color={
                    VEHICLES_TYPES[engineCapacity.value].otkRequired
                      ? 'rgba(243, 243, 243, 0.40)'
                      : null
                  }
                  name="otk"
                  changeCB={formik.handleChange}
                  isChecked={formik.values.otk}
                  isDisabled={VEHICLES_TYPES[engineCapacity.value].otkRequired}
                />
                {formik.values.otk && (
                  <CustomLabel
                    lableText="Дата наступного ОТК:"
                    labelColor={'#ffffff!important'}
                    errorposition={{
                      top: '100%',
                      right: '16px',
                    }}
                    className={'baseLine'}
                  >
                    <CustomDateInput
                      value={formik.values.otkDate}
                      setValue={(v) => formik.setFieldValue('otkDate', v)}
                      placeholder={'дд/мм/рррр'}
                    />
                    {formik.errors.otkDate && (
                      <div className="errorMessage">
                        {!formik.errors.otkDate.includes('otkDate')
                          ? formik.errors.otkDate
                          : DATE_MESSAGE_ERRORS.dateFormat}
                      </div>
                    )}
                  </CustomLabel>
                )}
              </>
            )}
          </div>

          <GeneralSelect
            id="address"
            lableText="Адреса за техпаспортом"
            optionsArr={allAddress}
            changeCB={changeAddress}
            currentValue={address}
            inputValue={queryText}
            inputChangeCB={handleChangeQueryText}
            helper={<HelperImg />}
            isDisabled={formik.values.foreignNumber}
            readOnly={false}
            noOptionsMessage="Вкажіть місце реєстрації"
            className={'baseLine'}
          />
          <CustomLabel
            lableText="Дата початку дії поліса:"
            labelColor={'#ffffff!important'}
            errorposition={{
              top: '100%',
              right: '16px',
            }}
            className={'baseLine'}
          >
            <CustomDateInput
              value={formik.values.dateFrom}
              setValue={(v) => formik.setFieldValue('dateFrom', v)}
              placeholder={'дд/мм/рррр'}
            />
            {formik.errors.dateFrom && (
              <div className="errorMessage">
                {!formik.errors.dateFrom.includes('dateFrom')
                  ? formik.errors.dateFrom
                  : DATE_MESSAGE_ERRORS.dateFormat}
              </div>
            )}
          </CustomLabel>
        </AllInputContStyled>

        <AllCheckboxContStyled>
          <GeneralCheckbox
            lableText="Є пільги"
            name="benefits"
            val={formik.values.benefits}
            changeCB={formik.handleChange}
            isChecked={
              engineCapacity.value === 'B5' ? false : formik.values.benefits
            }
            color={isPrivileged ? 'rgba(243, 243, 243, 0.40)' : null}
            isDisabled={isPrivileged ? true : false}
            helper={<HelperList />}
          />
          <GeneralCheckbox
            lableText="Авто на іноземних номерах"
            name="foreignNumber"
            val={formik.values.foreignNumber}
            isChecked={!formik.values.benefits && formik.values.foreignNumber}
            changeCB={(e) => {
              setQueryText('');
              setAddress({ label: '', value: '' });
              formik.handleChange(e);
            }}
            isDisabled={formik.values.benefits ? true : false}
            color={formik.values.benefits ? 'rgba(243, 243, 243, 0.40)' : null}
          />
        </AllCheckboxContStyled>

        <SubmitButton
          type="submit"
          disabled={
            !address.value && !formik.values.foreignNumber ? true : false
          }
        >
          Розрахувати вартість
        </SubmitButton>
      </FormStyled>
    </div>
  );
};

export default ByParameters;

{
  /* 
  <CommonDatePicker
    label="Дата початку дії поліса:"
    id="dateFrom"
    // selected={dateFrom}
    // onSelect={setDateFrom}
    closeOnScroll={(e) => e.target === document}
    name="date"
    dateFormat="dd/MM/yyyy"
    showIcon={true}
    minDate={addDays(new Date(), 1)}
    maxDate={addMonths(new Date(), 3)}
    // startDate={dateFrom}
    locale="uk"
    withPortal
    icon={
      <Box className="iconCalender">
        <SpriteSVG name="icon-calendar" />
      </Box>
    }
  /> 
*/
}
