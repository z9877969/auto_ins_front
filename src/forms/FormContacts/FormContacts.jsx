import { useEffect } from 'react';
import { patternFormatter } from 'react-number-format';
import PropTypes from 'prop-types';
import { InputBoxS, SpanS } from './FormContactsStyled';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import * as storage from '../../helpers/storage';
import { FORMIK_DATA_KEYS } from '../../constants';

const formatPhone = (value = '') =>
  patternFormatter(value.slice(3), {
    format: '+38##########',
    allowEmptyFormatting: true,
    mask: '',
    type: 'phone',
  });

const FormContacts = ({ formik }) => {
  useEffect(() => {
    const storedContacts = storage.getFromLS(FORMIK_DATA_KEYS.CONTACTS);
    !storedContacts?.phone && formik.setFieldValue('phone', formatPhone());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    storage.setToLS(FORMIK_DATA_KEYS.CONTACTS, formik.values);
  }, [formik.values]);

  return (
    <>
      <InputBoxS>
        <GeneralInput
          id="email"
          type="text"
          lableText="Електронна пошта* :"
          formikData={formik}
          customFunc={(e) =>
            formik.setFieldValue('email', e.target.value.trim())
          }
        />
        <SpanS variant="inputSpan">
          *ПЕРЕКОНАЙТЕСЬ ЩО ПОШТУ ВКАЗАНО КОРЕКТНО. НА ВКАЗАНУ ВАМИ ЕЛЕКТРОННУ
          ПОШТУ БУДЕ НАДІСЛАНО ДОГОВІР СТРАХУВАННЯ.
        </SpanS>
        <GeneralInput
          id="phone"
          lableText="Телефон* :"
          formikData={formik}
          customFunc={(e) => {
            formik.setFieldValue('phone', formatPhone(e.target.value));
          }}
        />
        <SpanS variant="inputSpan">
          *ПЕРЕКОНАЙТЕСЬ ЩО НОМЕР ВКАЗАНО КОРЕКТНО. НА ЦЕЙ НОМЕР БУДЕ НАДІСЛАНО
          КОД ДЛЯ ПІДТВЕРДЖЕННЯ УКЛАДАННЯ ПОЛІСУ.
        </SpanS>
      </InputBoxS>
    </>
  );
};

FormContacts.propTypes = {
  formik: PropTypes.object,
};
export default FormContacts;
