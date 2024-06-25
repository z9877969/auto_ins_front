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
} from '../../constants';
import HelperList from '../HelpCircle/HelperList/HelperList';
import { useActions } from '../../hooks/useActions';

// import { SpriteSVG } from '../../images/SpriteSVG';
// import { useState } from 'react';
import format from 'date-fns/format';
// import CommonDatePicker from '../CommonDatePicker/CommonDatePicker';
import CustomLabel from '../CustomLabel/CustomLabel';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import { validateContractStartDate } from '../../helpers/formValidationSchema';

const ByLicensePlate = () => {
  const navigate = useNavigate();
  const locationPath = useLocation();
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

  // const [dateFrom, setDateFrom] = useState(addDays(new Date(), 1));

  const formik = useFormik({
    initialValues: {
      licensePlate: '',
      benefits: false,
      dateFrom: format(addDays(new Date(), 1), 'dd/MM/yyyy'),
    },
    validationSchema: Yup.object().shape({
      dateFrom: validateContractStartDate(),
    }),
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
        customerCategory: values.benefits ? 'PRIVILEGED' : 'NATURAL',
        stateNumber: values.licensePlate,
        // dateFrom: format(dateFrom, 'yyyy-MM-dd'),
        dateFrom: values.dateFrom.split('/').reverse().join('-'),
      };
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

  return (
    <div>
      <FormStyled onSubmit={formik.handleSubmit}>
        <InputWrapperStyled>
          <Box className="box">
            <Typography
              variant="body1"
              component="label"
              htmlFor="license-plate"
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
            />
          </Box>
          <Box className="box">
            <CustomLabel
              lableText="Дата початку дії поліса:"
              labelColor={'#ffffff!important'}
            >
              <CustomDateInput
                value={formik.values.dateFrom}
                setValue={(v) => formik.setFieldValue('dateFrom', v)}
                placeholder={'дд/мм/рррр'}
              />
              {formik.errors.dateFrom ? (
                <div style={{ color: 'red' }}>
                  {!formik.errors.dateFrom.includes('dateFrom')
                    ? formik.errors.dateFrom
                    : DATE_MESSAGE_ERRORS.dateFormat}
                </div>
              ) : null}
            </CustomLabel>
            {/* <CommonDatePicker
              id="dateFrom"
              label="Дата початку дії поліса:"
              selected={dateFrom}
              mode="single"
              onSelect={setDateFrom}
              closeOnScroll={(e) => e.target === document}
              name="date"
              dateFormat="dd/MM/yyyy"
              showIcon={true}
              minDate={addDays(new Date(), 1)}
              maxDate={addMonths(new Date(), 3)}
              startDate={dateFrom}
              locale="uk"
              withPortal
              icon={
                <Box className="iconCalender">
                  <SpriteSVG name="icon-calendar" />
                </Box>
              }
            /> */}
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
        />
        <SubmitButton type="submit" disabled={!formik.values.licensePlate}>
          Розрахувати вартість
        </SubmitButton>
      </FormStyled>
    </div>
  );
};

export default ByLicensePlate;
