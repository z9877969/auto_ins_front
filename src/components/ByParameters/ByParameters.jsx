import { useFormik } from 'formik';
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
import { Box } from '@mui/material';
import { useState } from 'react';
import { SpriteSVG } from '../../images/SpriteSVG';
import { addMonths } from 'date-fns/esm';
import { useActions } from '../../hooks/useActions';
import format from 'date-fns/format';
import CommonDatePicker from '../CommonDatePicker/CommonDatePicker';
import { CATEGORY, CATEGORY_ERROR } from '../../constants';

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
    osagoByParams,
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
  const [dateFrom, setDateFrom] = useState(addDays(new Date(), 1));

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
    },
    onSubmit: (values) => {
      let sendObj = {
        customerCategory: values.benefits ? 'PRIVILEGED' : 'NATURAL',
        autoCategory: engineCapacity.value,
        outsideUkraine: values.foreignNumber,
        usageMonths: 0,
        taxi: false,
        dateFrom: format(dateFrom, 'yyyy-MM-dd'),
      };
      address.value ? (sendObj.registrationPlace = address.value) : null;
      setSubmitObj(sendObj);
      setStateNumber('');
      setAutoMakers([]);
      setAutoByNumber([]);
      setAutoModelByMaker([]);
      setTariffPolicyChoose([]);
      setTariffVcl([]);
      osagoByParams(sendObj);

      navigate('/prices', {
        state: { from: locationPath },
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
          <CommonDatePicker
            label="Дата початку дії поліса:"
            id="dateFrom"
            selected={dateFrom}
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
          />
        </AllInputContStyled>

        <AllCheckboxContStyled>
          <GeneralCheckbox
            lableText="Є пільги"
            name="benefits"
            val={formik.values.benefits}
            changeCB={formik.handleChange}
            isChecked={engineCapacity.value === 'B5' ? false : benefits}
            color={
              engineCapacity.value === 'B5' ? 'rgba(243, 243, 243, 0.40)' : null
            }
            isDisabled={engineCapacity.value === 'B5' ? true : false}
            helper={<HelperList />}
          />
          <GeneralCheckbox
            lableText="Авто на іноземних номерах"
            name="foreignNumber"
            val={formik.values.foreignNumber}
            isChecked={foreignNumber}
            changeCB={(e) => {
              setQueryText('');
              setAddress({ label: '', value: '' });
              formik.handleChange(e);
            }}
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
