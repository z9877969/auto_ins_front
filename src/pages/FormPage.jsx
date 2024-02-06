import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CompanySmall from "../components/CompanySmall/CompanySmall";
import { Wrapper } from "./FormPageStyled";
import Stepper from "../components/Stepper/Stepper";
import OutletPageWrapper from "../components/OutletPageWrapper";
import { getIsContractOSAGO } from "../redux/Global/selectors";
import { useActions } from "../hooks/useActions.js";

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from);
  const isContractOSAGO = useSelector(getIsContractOSAGO);

  useEffect(() => {
    if (isContractOSAGO) {
      navigate("/order/get", { replace: true });
    }
  }, [isContractOSAGO]);

  return (
    <OutletPageWrapper className="formPage">
      <Wrapper>
        <CompanySmall />
        <Box sx={{ display: "block" }}>
          <Stepper backLinkRef={backLinkRef} />
        </Box>
      </Wrapper>
    </OutletPageWrapper>
  );
};

export default FormPage;
