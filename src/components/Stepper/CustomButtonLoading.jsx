import { useSelector } from "react-redux";
import { YellowButtonStyled } from "../../forms/InsuredDataForm/InsuredDataForm.styled";
import { CircularProgress } from "@mui/material";
import { getIsLoading } from "../../redux/Global/selectors";

const CustomButtonLoading = ({ onCLick, btnTitle, isLoadingProp }) => {
  const isLoading = isLoadingProp ? isLoadingProp : useSelector(getIsLoading);
  return isLoading ? (
    <YellowButtonStyled>
      <CircularProgress />
    </YellowButtonStyled>
  ) : (
    <YellowButtonStyled onClick={onCLick}>{btnTitle}</YellowButtonStyled>
  );
};

export default CustomButtonLoading;
