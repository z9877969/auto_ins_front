import { useLocation } from "react-router-dom";
import CompanySmall from "../components/CompanySmall/CompanySmall";
import { Wrapper } from "./FormPageStyled";
import Stepper from "../components/Stepper/Stepper";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import OutletPageWrapper from "../components/OutletPageWrapper";
// import { useSelector } from "react-redux";
// import { getIsContractOSAGO } from "../redux/Global/selectors";
import BlockThank, {
  orderMessagesKeys,
} from "../components/BlockThank/BlockThank.jsx";

const FormPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from);
  // const isContractOSAGO = useSelector(getIsContractOSAGO);
  const isContractOSAGO = true;

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
