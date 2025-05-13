import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { SpriteSVG } from '../../images/SpriteSVG';
import // combineError,
'../../redux/Global/selectors';
import {
  BoxImgYellow,
  DialogStyled,
  TitleWrapper,
} from './ModalErrorWIthSupport.styled';
import {
  selectIsOpenPrivilageSupportModal,
  selectIsPrivilagedExist,
} from '../../redux/Calculator/selectors';
import SocialLink from 'modules/footer/components/SocialLink/SocialLink';
import FooterNavList from 'modules/footer/components/FooterNavList/FooterNavList';
import { socialLinksOptions } from 'modules/footer/data/footerNavLIstOptions';

const ModalErrorWithSupport = () => {
  const isPrivilagedExist = useSelector(selectIsPrivilagedExist);
  const isOpenPrivilageSupportModal = useSelector(
    selectIsOpenPrivilageSupportModal
  );
  const [open, setOpen] = useState(true);
  const {
    setIsModalErrorOpen,
    setStateNumber,
    setCalcError,
    setGlobError,
    setRefError,
    setInitialCalculatorState,
    setByByramsInitialState,
  } = useActions();
  // const globalError = useSelector(combineError);

  // const validError =
  //   'Номер не відповідає вимогам оформлення Електронного поліса встановленим МТСБУ (Моторно-транспортне страхове бюро України).';

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate('/');
    setIsModalErrorOpen(false);
    setStateNumber('');
  };
  useEffect(() => {
    return () => {
      setCalcError('');
      setGlobError('');
      setRefError('');
    };
  }, [setCalcError, setGlobError, setRefError]);

  useEffect(() => {
    return () => {
      if (isPrivilagedExist || isOpenPrivilageSupportModal) {
        setInitialCalculatorState();
        setByByramsInitialState();
      }
    };
  }, [
    isPrivilagedExist,
    isOpenPrivilageSupportModal,
    setInitialCalculatorState,
    setByByramsInitialState,
  ]);

  return (
    <>
      <DialogStyled open={open} onClose={handleClose}>
        <Box
          aria-label="close"
          className="closeIcon"
          component="button"
          onClick={handleClose}
        >
          <SpriteSVG name={'icon-x'} />
        </Box>
        <TitleWrapper>
          <BoxImgYellow>
            <SpriteSVG name="icon-alert-triangle" />
          </BoxImgYellow>
          <Typography variant="subtitle1" className="title" component="h2">
            Увага
          </Typography>
        </TitleWrapper>

        <DialogContent>
          <DialogContentText component="div">
            {/* <Typography component="p" variant="body1">
              {globalError || validError}
            </Typography> */}
            <Typography
              component="p"
              variant="subtitle1"
              sx={{ padding: { xs: '8px 0', sm: '16px 0' } }}
            >
              Напишіть і наші спеціалісти підберуть пропозицію для вас
            </Typography>
          </DialogContentText>
        </DialogContent>
        <FooterNavList
          options={socialLinksOptions}
          linkComponent={SocialLink}
          sx={{ rowGap: '4px' }}
          className="socialOrder"
        />
      </DialogStyled>
    </>
  );
};

export default ModalErrorWithSupport;
