import { useSelector } from 'react-redux';
import { YellowButtonStyled } from '../../forms/InsuredDataForm/InsuredDataForm.styled';
import { CircularProgress } from '@mui/material';
import { getIsLoading } from '../../redux/Global/selectors';

const CustomButtonLoading = ({
  onCLick,
  btnTitle,
  isLoadingProp,
  ...props
}) => {
  const storeIsLoading = useSelector(getIsLoading)  
  const isLoading = isLoadingProp ? isLoadingProp : storeIsLoading;
  return isLoading ? (
    <YellowButtonStyled {...props}>
      <CircularProgress />
    </YellowButtonStyled>
  ) : (
    <YellowButtonStyled onClick={onCLick} {...props}>
      {btnTitle}
    </YellowButtonStyled>
  );
};

export default CustomButtonLoading;
