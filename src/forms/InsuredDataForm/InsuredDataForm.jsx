import {
  // DataContainerWrapper,
  DocInputsStyled,
  InputContBoxStyled,
} from './InsuredDataForm.styled';
import GeneralSelect from '../../components/GeneralSelect/GeneralSelect';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import PropTypes from 'prop-types';
// import { Box } from '@mui/material';
// import { SpriteSVG } from '../../images/SpriteSVG';
// import ReactDatePicker from 'react-datepicker';
// import { useState } from 'react';
// import sub from 'date-fns/sub';
// import { InputStyled } from '../../components/GeneralInput/GeneralInput.styled';
// import CommonDatePicker from '../../components/CommonDatePicker/CommonDatePicker';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';
import { DATE_MESSAGE_ERRORS } from '../../constants';

const errorPosition = {
  right: '8px',
  top: 0,
  transform: 'translateY(-2px)',
};

const InsuredDataForm = ({ formik, selectData }) => {
  const { InsuredDataSelectOptions, identityCard, setIdentityCard } =
    selectData;

  const isID_PASSPORT = identityCard.value === 'ID_PASSPORT';

  return (
    <>
      <InputContBoxStyled>
        <GeneralInput id="surname" lableText="Прізвище*:" formikData={formik} />
        <GeneralInput id="name" lableText="Ім’я*:" formikData={formik} />
        <GeneralInput
          id="middleName"
          lableText="По батькові*:"
          formikData={formik}
        />
        <CustomLabel
          lableText="Дата народження*:"
          errorPosition={errorPosition}
        >
          <CustomDateInput
            value={formik.values.birthDate}
            setValue={(v) => formik.setFieldValue('birthDate', v)}
            placeholder={'дд/мм/рррр'}
          />
          {formik.errors.birthDate ? (
            <div className="errorMessage">
              {!formik.errors.birthDate.includes('birthDate')
                ? formik.errors.birthDate
                : DATE_MESSAGE_ERRORS.dateFormat}
            </div>
          ) : null}
        </CustomLabel>
        {/* <DataContainerWrapper>
          <label htmlFor="dateFrom">Дата народження*:</label>
          <ReactDatePicker
            className="yearMonthPicker"
            id="birthDate"
            mode="single"
            selected={birthDate}
            onSelect={setBirthDate}
            onChange={hadleChangeBirthDate}
            // closeOnScroll={(e) => e.target === document}
            startDate={birthDate}
            name="date"
            maxDate={sub(new Date(), {
              years: 18,
            })}
            customInput={<InputStyled />}
            dateFormat="dd/MM/yyyy"
            showIcon={true}
            locale="uk"
            withPortal
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            icon={
              <Box className="iconCalender">
                <SpriteSVG name={'icon-calendar'} />
              </Box>
            }
          />
        </DataContainerWrapper> */}
        <GeneralInput id="taxNumber" lableText="РНОКПП*:" formikData={formik} />
        <GeneralSelect
          id="licensDoc"
          lableText="Документ на вибір*:"
          optionsArr={InsuredDataSelectOptions}
          changeCB={setIdentityCard} //функція що повертає вибране значення (піднесення)
          currentValue={identityCard}
        />
        <DocInputsStyled>
          {!isID_PASSPORT && (
            <GeneralInput
              className="input-container"
              id="series"
              lableText="Серія*:"
              formikData={formik}
            />
          )}
          <GeneralInput
            className="input-container"
            id="number"
            lableText="Номер*:"
            formikData={formik}
          />
          {isID_PASSPORT && (
            <GeneralInput
              className="input-container"
              id="record"
              lableText="УНЗР*:"
              formikData={formik}
            />
          )}
          <GeneralInput
            className="input-container"
            id="issuedBy"
            lableText="Ким виданий*:"
            formikData={formik}
          />
          <CustomLabel lableText="Дата видачі*:" errorPosition={errorPosition}>
            <CustomDateInput
              value={formik.values.date}
              setValue={(v) => formik.setFieldValue('date', v)}
              placeholder={'дд/мм/рррр'}
            />
            {formik.errors.date && (
              <div className="errorMessage">
                {!formik.errors.date.includes('date')
                  ? formik.errors.date
                  : DATE_MESSAGE_ERRORS.dateFormat}
              </div>
            )}
          </CustomLabel>
          {/* <CommonDatePicker
            label="Дата видачі*:"
            id="date"
            mode="single"
            selected={date}
            onSelect={setDate}
            onChange={hadleChangeDate}
            closeOnScroll={(e) => e.target === document}
            startDate={date}
            name="date"
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            showIcon={true}
            locale="uk"
            withPortal
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            icon={
              <Box className="iconCalender">
                <SpriteSVG name={'icon-calendar'} />
              </Box>
            }
          /> */}
        </DocInputsStyled>
      </InputContBoxStyled>
    </>
  );
};

export default InsuredDataForm;

InsuredDataForm.propTypes = {
  formik: PropTypes.object,
  selectData: PropTypes.object,
};
