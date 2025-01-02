import { Box } from '@mui/material';
import BurgerSocialList from 'components/BurgerSocialList/BurgerSocialList';
import * as S from './NoWorkModal.styled';

const NoWorkModal = () => {
  return (
    <S.Wrapper>
      <Box component={'h2'} sx={{ lineHeight: 1.2 }}>
        {'Наразі сервіс тимчасово недоступний :('}
        <br />
        {'Щоб замовити поліс, ви можете зв`язатись з нами.'}
      </Box>
      <Box display={'flex'} columnGap={'16px'}>
        <Box component={'p'} alignSelf={'center'}>
          Наші контакти
        </Box>
      </Box>
      <BurgerSocialList />
    </S.Wrapper>
  );
};

export default NoWorkModal;
