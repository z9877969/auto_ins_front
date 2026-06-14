import CloseIcon from '@mui/icons-material/Close';
import feedbackCar from '../../images/feedbackCar.svg';
import * as S from './FeedbackSuccessModal.styled';

const FeedbackSuccessModal = ({ open, onClose }) => {
  return (
    <S.DialogStyled open={open} onClose={onClose}>
      <S.CloseButton onClick={onClose} aria-label="закрити">
        <CloseIcon sx={{ fontSize: '24px' }} />
      </S.CloseButton>

      <S.Title component="h2">Дякуємо Вам!</S.Title>
      <S.Subtitle>Ваш відгук дуже важливий для нас.</S.Subtitle>

      <S.CarImageWrapper>
        <img src={feedbackCar} alt="" aria-hidden="true" />
      </S.CarImageWrapper>
    </S.DialogStyled>
  );
};

export default FeedbackSuccessModal;
