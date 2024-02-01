import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CompanySmall from "../components/CompanySmall/CompanySmall";
import { Wrapper } from "./FormPageStyled";
import Stepper from "../components/Stepper/Stepper";
import { Box } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import OutletPageWrapper from "../components/OutletPageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getIsContractOSAGO } from "../redux/Global/selectors";
import BlockThank, {
  orderMessagesKeys,
} from "../components/BlockThank/BlockThank.jsx";
import { useActions } from "../hooks/useActions.js";

const FormPage = () => {
  const navigate = useNavigate();
  const actions = useActions();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from);
  const isContractOSAGO = useSelector(getIsContractOSAGO);
  const [search, setSearch] = useSearchParams();
  const type = search.get("type");

  useEffect(() => {
    isContractOSAGO &&
      !type &&
      setSearch({ type: orderMessagesKeys.ORDER_GET });
  }, [isContractOSAGO, type]);

  // useEffect(() => {
  //   () => {
  //     actions.clearGlobal();
  //   };
  // }, []);

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
