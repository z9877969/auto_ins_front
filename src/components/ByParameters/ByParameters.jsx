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
  // selectCategoryOptions,
  withDisabledSelectCategoryOptions as selectCategoryOptions,
  selectAutoCategory,
} from '../../helpers/ByParameters/selectOptions';
import { useSelector } from 'react-redux';
import HelperImg from '../HelpCircle/HelperImg/HelperImg';
import HelperList from '../HelpCircle/HelperList/HelperList';
// import { Box, TextField, formControlClasses } from '@mui/material';
// import { useEffect, useRef, useState } from 'react';
// import { SpriteSVG } from '../../images/SpriteSVG';
// import { addMonths } from 'date-fns/esm';
import { useActions } from '../../hooks/useActions';
import format from 'date-fns/format';
// import CommonDatePicker from '../CommonDatePicker/CommonDatePicker';
import {
  CATEGORY,
  CATEGORY_ERROR,
  DATE_MESSAGE_ERRORS,
  ORDER_TYPE,
} from '../../constants';

import CustomLabel from '../CustomLabel/CustomLabel';
import CustomDateInput from '../CustomDateInput/CustomDateInput';
import {
  validateContractStartDate,
  // validateFullAgeDate,
} from '../../helpers/formValidationSchema';

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
    setRefError,
    setIsModalErrorOpen,
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
  const handleChangeengineCapacity = (e) => {
    setEngineCapacity(e);
  };
  const handleChangeVehicle = (e) => {
    const c = CATEGORY.find((item) => item.includes(e.value));
    if (c) {
      setVehicle(e);
      setEngineCapacity(selectAutoCategory(e.value)[0]);
    } else {
      setRefError(CATEGORY_ERROR);
      setIsModalErrorOpen(true);
    }
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
        customerCategory: values.benefits ? 'PRIVILEGED' : 'NATURAL',
        autoCategory: engineCapacity.value,
        outsideUkraine: values.foreignNumber,
        usageMonths: 0,
        taxi: false,
        dateFrom: values.dateFrom.split('/').reverse().join('-'),
      };
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
      <FormStyled onSubmit={formik.handleSubmit}>
        <AllInputContStyled>
          <GeneralSelect
            id="vehicle"
            lableText="Транспортний засіб"
            optionsArr={selectCategoryOptions}
            changeCB={handleChangeVehicle}
            currentValue={vehicle}
          />
          <GeneralSelect
            id="engineCapacity"
            lableText="Об’єм двигуна"
            optionsArr={selectAutoCategory(vehicle.value)}
            changeCB={handleChangeengineCapacity}
            currentValue={engineCapacity}
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
          >
            <CustomDateInput
              value={formik.values.dateFrom}
              setValue={(v) => formik.setFieldValue('dateFrom', v)}
              placeholder={'дд/мм/рррр'}
            />
            {formik.errors.dateFrom ? (
              <div
                style={{
                  color: 'red',
                  position: 'absolute',
                  top: '100%',
                  left: '16px',
                  transform: 'translateY(-4px)',
                }}
              >
                {!formik.errors.dateFrom.includes('dateFrom')
                  ? formik.errors.dateFrom
                  : DATE_MESSAGE_ERRORS.dateFormat}
              </div>
            ) : null}
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
