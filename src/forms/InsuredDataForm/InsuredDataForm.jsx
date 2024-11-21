import { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { DocInputsStyled, InputContBoxStyled } from './InsuredDataForm.styled';
import GeneralSelect from '../../components/GeneralSelect/GeneralSelect';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import CustomDateInput from '../../components/CustomDateInput/CustomDateInput';
import { DATE_MESSAGE_ERRORS, FORMIK_DATA_KEYS } from '../../constants';
import * as storage from '../../helpers/storage';
import { insurerDocsDict } from 'assets/utils/insurerDocsDict';

const InsuredDataForm = ({ formik, docTypesOptions }) => {
  const identityCardType = formik.values.type.value;

  const isID_PASSPORT = identityCardType === 'ID_PASSPORT';

  useEffect(() => {
    storage.setToLS(FORMIK_DATA_KEYS.INSURED, formik.values);
  }, [formik.values]);

  return (
    <>
      <InputContBoxStyled>
        <GeneralInput
          id="surname"
          lableText="Прізвище*:"
          formikData={formik}
          placeholder={'Шевченко'}
        />
        <GeneralInput
          id="name"
          lableText="Ім’я*:"
          formikData={formik}
          placeholder={'Тарас'}
        />
        <GeneralInput
          id="middleName"
          lableText="По батькові*:"
          formikData={formik}
          placeholder={'Григорович'}
        />
        <CustomLabel lableText="Дата народження*:">
          <CustomDateInput
            value={formik.values.birthDate}
            setValue={(v) => formik.setFieldValue('birthDate', v)}
            placeholder={'09/03/1814'}
          />
          {formik.errors.birthDate ? (
            <div className="errorMessage">
              {!formik.errors.birthDate.includes('birthDate')
                ? formik.errors.birthDate
                : DATE_MESSAGE_ERRORS.dateFormat}
            </div>
          ) : null}
        </CustomLabel>
        <GeneralInput
          id="taxNumber"
          lableText="РНОКПП(Ідентифікаційний код)*:"
          formikData={formik}
          placeholder={'1234567890'}
        />
        <GeneralSelect
          id="type"
          lableText="Документ на вибір*:"
          optionsArr={docTypesOptions}
          changeCB={(option) => formik.setFieldValue('type', option)} //функція що повертає вибране значення (піднесення)
          currentValue={formik.values.type}
        />
        <DocInputsStyled>
          {!isID_PASSPORT && (
            <GeneralInput
              className="input-container"
              id="series"
              lableText="Серія*:"
              formikData={formik}
              customFunc={(e) => {
                formik.setFieldValue('series', e.target.value.toUpperCase());
                formik.validateField(e.target.name);
              }}
              placeholder={insurerDocsDict[identityCardType].series.placeholder}
            />
          )}
          <GeneralInput
            className="input-container"
            id="number"
            lableText="Номер*:"
            formikData={formik}
            placeholder={insurerDocsDict[identityCardType].number.placeholder}
          />
          {isID_PASSPORT && (
            <GeneralInput
              className="input-container"
              id="series"
              lableText="УНЗР*:"
              formikData={formik}
              customFunc={(e) => {
                formik.setFieldValue('series', e.target.value.toUpperCase());
              }}
              placeholder={insurerDocsDict[identityCardType].series.placeholder}
            />
          )}
          <GeneralInput
            className="input-container"
            id="issuedBy"
            lableText="Ким виданий*:"
            formikData={formik}
            placeholder={'МРЕВ'}
          />
          <CustomLabel lableText="Дата видачі*:">
            <CustomDateInput
              value={formik.values.date}
              setValue={(v) => formik.setFieldValue('date', v)}
              placeholder={'25/07/2024'}
            />
            {formik.errors.date && (
              <div className={clsx('errorMessage', 'half')}>
                {!formik.errors.date.includes('date')
                  ? formik.errors.date
                  : DATE_MESSAGE_ERRORS.dateFormat}
              </div>
            )}
          </CustomLabel>
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
