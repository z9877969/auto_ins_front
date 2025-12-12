import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from 'hooks/useActions';
import { getAutoByNumber } from '@redux/References/selectors';
import GeneralSelect from 'components/GeneralSelect/GeneralSelect';
import HelperImg from 'components/HelpCircle/HelperImg/HelperImg';
import * as S from './RegistrationPlaceErrorModal.styled';
import * as GlobalS from 'style/Global.styled';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from '@mui/material';
import { SpriteSVG } from 'images/SpriteSVG';

const RegistrationPlaceErrorModal = ({ closeModal, params }) => {
  const {
    queryText,
    addressOptions: allAddress,
    address,
    submitObj: { stateNumber },
  } = useSelector((state) => state.byParameters);
  const [{ category: autoCategory }] = useSelector(getAutoByNumber);
  const {
    setAddress,
    setQueryText,
    getAddress,
    setAddressOptions,
    osagoByParams,
  } = useActions();

  const memoizedStateNumber = useMemo(
    () => stateNumber.toUpperCase().split(),
    [stateNumber]
  );

  const changeAddress = (selectOption) => {
    if (queryText) {
      setAddress(selectOption);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqParams = {
      autoCategory,
      taxi: false,
      usageMonths: 0,
      customerCategory: params.customerCategory,
      dateFrom: params.dateFrom,
      outsideUkraine: params.outsideUkraine,
      registrationPlace: address.value,
      registrationType: params.registrationType,
    };
    await osagoByParams(reqParams).unwrap();
    closeModal();
  };

  const handleCloseModal = () => {
    window.location.replace('/');
  };

  return (
    <S.Dialog open={true} onClose={handleCloseModal}>
      <Box
        aria-label="close"
        className="closeIcon"
        component="button"
        onClick={handleCloseModal}
      >
        <SpriteSVG name={'icon-x'} />
      </Box>
      <S.TitleWrapper>
        <S.BoxImgYellow>
          <SpriteSVG name="icon-alert-triangle" />
        </S.BoxImgYellow>
        <Typography variant="subtitle1" className="title" component="h2">
          Увага
        </Typography>
      </S.TitleWrapper>

      <DialogContent>
        <DialogContentText component="div">
          <Typography
            component="p"
            variant="subtitle1"
            sx={{ padding: { xs: '8px 0', sm: '16px 0' } }}
          >
            Вкажіть місто реєстрації
          </Typography>
          <Typography component="p" variant="body1">
            Для авто <b>{memoizedStateNumber}</b> не вдалось визначити місто
            реєстрації власника.
            <br />
            Введіть назву населеного пункту
          </Typography>
        </DialogContentText>
      </DialogContent>

      <form onSubmit={handleSubmit}>
        <GeneralSelect
          id="address"
          lableText="Адреса за техпаспортом"
          optionsArr={allAddress}
          changeCB={changeAddress}
          currentValue={address}
          inputValue={queryText}
          inputChangeCB={handleChangeQueryText}
          helper={<HelperImg />}
          readOnly={false}
          noOptionsMessage="Вкажіть місце реєстрації"
          className={'baseLine'}
          placeholder={'Київ'}
          sx={{ width: '100%' }}
          fullWidth
          color="#000"
        />
        <DialogActions sx={{ mt: 4 }}>
          <GlobalS.BlueButton
            arai-label="Продовжити"
            className="buttonDesktop"
            onClick={null}
            sx={{ width: { xs: '100%' } }}
            type="submit"
            disabled={!address.value}
          >
            Продовжити
          </GlobalS.BlueButton>
          <S.ButtonCancel
            className="buttonDesktop"
            onClick={handleCloseModal}
            aria-label="скасувати"
            type="button"
          >
            Скасувати
          </S.ButtonCancel>
        </DialogActions>
      </form>
    </S.Dialog>
  );
};

export default RegistrationPlaceErrorModal;
