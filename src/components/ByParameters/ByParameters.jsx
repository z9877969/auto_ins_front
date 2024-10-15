import { useFormik } from 'formik';
import * as Yup from 'yup';

import {
  AllCheckboxContStyled,
  AllInputContStyled,
  FormStyled,
  SubmitButton,
} from './ByParameters.styled';
import addDays from 'date-fns/addDays';
import GeneralSelect from '../GeneralSelect/GeneralSelect';
import { GeneralCheckbox } from '../GeneralCheckbox/GeneralCheckbox';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  vehicleGroupsOptions,
  selectAutoCategory,
} from '../../helpers/ByParameters/selectOptions';
import { useSelector } from 'react-redux';
import HelperImg from '../HelpCircle/HelperImg/HelperImg';
import HelperList from '../HelpCircle/HelperList/HelperList';
import { useActions } from '../../hooks/useActions';
import format from 'date-fns/format';
import {
  DATE_MESSAGE_ERRORS,
  ORDER_TYPE,
  PRIVILEGED_TYPE,
} from '../../constants';

import CustomLabel from '../CustomLabel/CustomLabel';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import { validateContractStartDate } from '../../helpers/formValidationSchema';
import { normalizeDate } from '../../helpers/normalizeDate';

const ByParameters = () => {
  const navigate = useNavigate();
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
    },
    validationSchema: Yup.object().shape({
      dateFrom: validateContractStartDate(),
    }),
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
      };
      // a + 5;
      address.value ? (sendObj.registrationPlace = address.value) : null;
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

  return (
    <div>
      <FormStyled
        onSubmit={(e) => {
          e.preventDefault();
          a + 5;
          formik.handleSubmit(e);
        }}
      >
        <AllInputContStyled>
          <GeneralSelect
            id="vehicle"
            lableText="Транспортний засіб"
            optionsArr={vehicleGroupsOptions}
            changeCB={handleChangeVehicle}
            currentValue={vehicle}
          />
          <GeneralSelect
            id="engineCapacity"
            lableText="Об’єм двигуна"
            optionsArr={selectAutoCategory(vehicle.value)}
            changeCB={handleChangeVehicleSubtype}
            currentValue={engineCapacity}
          />
          <GeneralCheckbox
            lableText="ОТК"
            name="otk"
            val={formik.values.otk}
            // isChecked={!formik.values.benefits && formik.values.foreignNumber}
            changeCB={formik.handleChange}
            // isDisabled={formik.values.otk ? true : false}
            // color={formik.values.benefits ? 'rgba(243, 243, 243, 0.40)' : null}
          />
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
          />
          <CustomLabel
            lableText="Дата початку дії поліса:"
            labelColor={'#ffffff!important'}
            errorposition={{
              top: '100%',
              right: '16px',
            }}
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
          {/* <CommonDatePicker
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
          /> */}
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
            color={
              engineCapacity.value === 'B5' || formik.values.foreignNumber
                ? 'rgba(243, 243, 243, 0.40)'
                : null
            }
            isDisabled={
              engineCapacity.value === 'B5' || formik.values.foreignNumber
                ? true
                : false
            }
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
