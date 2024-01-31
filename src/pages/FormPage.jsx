import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CompanySmall from "../components/CompanySmall/CompanySmall";
import { Wrapper } from "./FormPageStyled";
import Stepper from "../components/Stepper/Stepper";
import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import OutletPageWrapper from "../components/OutletPageWrapper";
import { useSelector } from "react-redux";
import { getIsContractOSAGO } from "../redux/Global/selectors";
import BlockThank, {
  orderMessagesKeys,
} from "../components/BlockThank/BlockThank.jsx";

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from);
  // const isContractOSAGO = useSelector(getIsContractOSAGO);
  const [search] = useSearchParams();
  const isContractOSAGO = true;
  const type = search.get("type");
  const redirect = useCallback((path) => navigate(path), []);

  useEffect(() => {
    !isContractOSAGO &&
      type !== orderMessagesKeys.ORDER_EMMITED &&
      redirect("/");
  }, []);

  return (
    <OutletPageWrapper className="formPage">
      {isContractOSAGO || type === orderMessagesKeys.ORDER_EMMITED ? (
        <BlockThank />
      ) : (
        <Wrapper>
          <CompanySmall />
          <Box sx={{ display: "block" }}>
            <Stepper backLinkRef={backLinkRef} />
          </Box>
        </Wrapper>
      )}
    </OutletPageWrapper>
  );
};

export default FormPage;
