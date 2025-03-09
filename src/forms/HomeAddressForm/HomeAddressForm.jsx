import {
  DocInputsStyled,
  InputContBoxStyled,
} from '../InsuredDataForm/InsuredDataForm.styled';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import PropTypes from 'prop-types';
import GeneralSelect from '../../components/GeneralSelect/GeneralSelect';
import { useEffect, useState } from 'react';
import { fetchAddress } from '../../redux/byParameters/operations';
import { useActions } from '../../hooks/useActions';
import * as storage from '../../helpers/storage';
import { FORMIK_DATA_KEYS } from '../../constants';

const HomeAddressForm = ({ formik }) => {
  const { setHomeAddress } = useActions();

  const [allAddress, setAllAddress] = useState([]);
  const [queryText, setQueryText] = useState(formik.values.regionANDcity || '');

  const getHomeAddress = async (e) => {
    setQueryText(e);
    setAllAddress(await fetchAddress(e));
  };
  const setAddress = async (option) => {
    formik.setFieldValue('regionANDcity', option.label);
    setHomeAddress(option);
  };

  useEffect(() => {
    storage.setToLS(FORMIK_DATA_KEYS.HOME_ADDRESS, formik.values);
  }, [formik.values]);

  return (
    <>
      <InputContBoxStyled>
        <GeneralSelect
          id="homeAddress"
          lableText="Адреса"
          optionsArr={allAddress}
          changeCB={setAddress} //функція що повертає вибране значення (піднесення)
          inputValue={queryText}
          inputChangeCB={getHomeAddress}
          readOnly={false}
          noOptionsMessage="Вкажіть місце проживання"
          placeholder={!queryText && 'Київ, Україна'}
          errorMessage={
            formik.touched['regionANDcity'] && formik.errors['regionANDcity']
          }
        />
        <GeneralInput
          id="street"
          lableText="Вулиця*:"
          formikData={formik}
          placeholder={'Хрещатик'}
        />
        <DocInputsStyled>
          <GeneralInput
            id="houseNumber"
            lableText="Будинок*:"
            formikData={formik}
            placeholder={'1'}
          />
          <GeneralInput
            id="apartmentNumber"
            lableText="Квартира:"
            formikData={formik}
          />
        </DocInputsStyled>
      </InputContBoxStyled>
    </>
  );
};

export default HomeAddressForm;

HomeAddressForm.propTypes = {
  formik: PropTypes.object,
};
