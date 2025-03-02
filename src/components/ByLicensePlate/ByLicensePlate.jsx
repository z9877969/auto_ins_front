import addDays from 'date-fns/addDays';
// import addMonths from 'date-fns/addMonths';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import {
  FormStyled,
  InputStyled,
  InputWrapperStyled,
} from './ByLicensePlate.styled';
import { SubmitButton } from '../ByParameters/ByParameters.styled';
import HelpCircle from '../HelpCircle/HelpCircle';
import { GeneralCheckbox } from '../GeneralCheckbox/GeneralCheckbox';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DATE_MESSAGE_ERRORS,
  DNUMBER_REGEX,
  ORDER_TYPE,
  PRIVILEGED_TYPE,
  REGISTRATION_TYPES,
} from '../../constants';
import HelperList from '../HelpCircle/HelperList/HelperList';
import { useActions } from '../../hooks/useActions';
import format from 'date-fns/format';
import CustomLabel from '../CustomLabel/CustomLabel';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import {
  validateContractOtkDate,
  validateContractStartDate,
} from '../../helpers/formValidationSchema';
import { normalizeDate } from '../../helpers/normalizeDate';
import { addYears } from 'date-fns';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ByLicensePlate = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
  const {
    submitObj: { registrationType },
  } = useSelector((state) => state.byParameters);
  const {
    setAddress,
    setIsModalErrorOpen,
    // setEngineCapacity,
    setAutoModelByMaker,
    setStateNumber,
    setAutoMakers,
    setSubmitObj,
    // osagoByDn,
    autoByNumber,
    setAutoByNumber,
  } = useActions();

  const formik = useFormik({
    initialValues: {
      licensePlate: '',
      benefits: false,
      dateFrom: format(addDays(new Date(), 1), 'dd/MM/yyyy'),
      otk: registrationType === REGISTRATION_TYPES.PERMANENT_WITH_OTK,
      otkDate: format(addDays(addYears(new Date(), 1), 1), 'dd/MM/yyyy'),
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
    onSubmit: async (values) => {
      const stateNumber = values.licensePlate
        .trim()
        .toUpperCase()
        .match(DNUMBER_REGEX);
      if (!stateNumber) {
        setIsModalErrorOpen(true);
        return;
      }
      const params = {
        outsideUkraine: false,
        customerCategory: values.benefits
          ? PRIVILEGED_TYPE.PRIVILEGED
          : PRIVILEGED_TYPE.NATURAL,
        stateNumber: values.licensePlate,
        dateFrom: normalizeDate(values.dateFrom),
        registrationType: values.registrationType,
      };
      if (values.otk) {
        params.otkDate = normalizeDate(values.otkDate);
      }
      setAutoByNumber([]);
      setAddress({ label: '', value: '' });
      setAutoModelByMaker([]);
      setAutoMakers([]);
      setStateNumber(params.stateNumber);
      setSubmitObj(params);
      const {
        payload: [carInfo],
      } = await autoByNumber(params.stateNumber);
      if (!carInfo) {
        setIsModalErrorOpen(true);
        return;
      }
      navigate('/prices', {
        state: {
          from: locationPath,
          params,
          type: ORDER_TYPE.BY_LICENSE_PLATE,
        },
      });
    },
  });

  const { values, setValues } = formik;

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

  return (
    <div>
      <FormStyled onSubmit={formik.handleSubmit}>
        <InputWrapperStyled>
          <Box className="fieldsWrapper">
            <Box className="box">
              <Box className="numberField">
                <Typography
                  variant="body1"
                  component="label"
                  htmlFor="license-plate"
                  className="fieldLabel"
                  sx={{
                    mb: 0,
                  }}
                >
                  Номер транспортного засобу
                  <HelpCircle lableText="Державний номерний знак" />
                </Typography>
                <InputStyled
                  name="licensePlate"
                  type="text"
                  value={formik.values.licensePlate.trim().toUpperCase()}
                  onChange={(e) => {
                    const e2 = e.target.value.trim().toUpperCase();
                    formik.setFieldValue('licensePlate', e2);
                    formik.handleChange(e);
                  }}
                  id="license-plate"
                  required
                  placeholder='AA1234AA'
                />
              </Box>
              <Box className="otkWrapper">
                <GeneralCheckbox
                  lableText="ОТК"
                  labelColor={'#ffffff!important'}
                  name="otk"
                  changeCB={formik.handleChange}
                  isChecked={formik.values.otk}
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
              </Box>
            </Box>
            <Box className="box">
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
            </Box>
          </Box>
        </InputWrapperStyled>
        <GeneralCheckbox
          lableText="Є пільги"
          name="benefits"
          val={formik.values.benefits}
          isChecked={formik.values.benefits}
          changeCB={formik.handleChange}
          helper={<HelperList />}
          className="checkbox"
          isDisabled={values.otk}
          color={values.otk ? 'rgba(243, 243, 243, 0.40)' : null}
        />
        <SubmitButton type="submit" disabled={!formik.values.licensePlate}>
          Розрахувати вартість
        </SubmitButton>
      </FormStyled>
    </div>
  );
};

export default ByLicensePlate;
