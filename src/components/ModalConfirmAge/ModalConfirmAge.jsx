import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import { SpriteSVG } from '../../images/SpriteSVG';
import { BlueButton } from '../../style/Global.styled';
import {
  BoxImgYellow,
  ButtonCancel,
  DialogStyled,
  TitleWrapper,
} from './ModalConfirmAgeStyled';

const ModalConfirmAge = ({ onConfirm, onClose, isModalOpen }) => {
  return (
    <>
      <DialogStyled open={isModalOpen} onClose={onClose}>
        <Box
          aria-label="close"
          className="closeIcon"
          component="button"
          onClick={onClose}
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
            <Typography
              component="p"
              variant="subtitle1"
              sx={{ padding: { xs: '8px 0', sm: '16px 0' } }}
            >
              Якщо вік страхувальника менший за обраний - поліс не буде
              оформлений
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BlueButton
            aria-label="Розрахувати за параметрами"
            className="buttonDesktop"
            onClick={onConfirm}
            sx={{ width: { xs: '100%' } }}
          >
            Продовжити оформлення
          </BlueButton>
          <ButtonCancel
            className="buttonDesktop"
            onClick={onClose}
            aria-label="скасувати"
          >
            Обрати вік
          </ButtonCancel>
        </DialogActions>
      </DialogStyled>
    </>
  );
};

export default ModalConfirmAge;
