import {
  DocInputsStyled,
  InputContBoxStyled,
} from '../InsuredDataForm/InsuredDataForm.styled';
import GeneralInput from '../../components/GeneralInput/GeneralInput';
import PropTypes from 'prop-types';
import GeneralSelect from '../../components/GeneralSelect/GeneralSelect';
import { useEffect, useState } from 'react';
import { fetchAddress } from '../../redux/byParameters/operations';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import * as storage from '../../helpers/storage';
import { FORMIK_DATA_KEYS } from '../../constants';

const HomeAddressForm = ({ formik }) => {
  const { setHomeAddress } = useActions();
  const address = useSelector((state) => state.global.homeAddress);

  const [allAddress, setAllAddress] = useState([]);
  const [queryText, setQueryText] = useState('');

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
          currentValue={address.label && address.value ? address : undefined}
          inputValue={queryText}
          inputChangeCB={getHomeAddress}
          isValid={Boolean(address.label)}
          readOnly={false}
          noOptionsMessage="Вкажіть місце проживання"
          placeholder={!queryText && 'м. Київ, Україна'}
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
