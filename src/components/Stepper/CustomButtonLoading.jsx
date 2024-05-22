import { useSelector } from 'react-redux';
import { YellowButtonStyled } from '../../forms/InsuredDataForm/InsuredDataForm.styled';
import { CircularProgress } from '@mui/material';
import { getIsLoading } from '../../redux/Global/selectors';

const CustomButtonLoading = ({ onCLick, btnTitle, isLoadingProp }) => {
  const storedIsLoading = useSelector(getIsLoading);
  const isLoading = isLoadingProp ? isLoadingProp : storedIsLoading;
  
  return isLoading ? (
    <YellowButtonStyled>
      <CircularProgress />
    </YellowButtonStyled>
  ) : (
    <YellowButtonStyled onClick={onCLick}>{btnTitle}</YellowButtonStyled>
  );
};

export default CustomButtonLoading;
