import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import CompanySmall from '../components/CompanySmall/CompanySmall';
import { Wrapper } from './FormPageStyled';
import Stepper from '../components/Stepper/Stepper';
import OutletPageWrapper from '../components/OutletPageWrapper';
import {
  getIsContractOSAGO,
  getIsOrderRequested,
  selectOrderData,
} from '../redux/Global/selectors';
import { useScrollToTop } from 'hooks/useScrollToTop';
import { requestOrderApi } from 'services/api';
import { useActions } from 'hooks/useActions';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOrderRequested, getIpnBlackList } = useActions();
  const backLinkRef = useRef(location.state?.from);
  const isContractOSAGO = useSelector(getIsContractOSAGO);
  const isOrderRequested = useSelector(getIsOrderRequested);
  const orderData = useSelector(selectOrderData);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [_, setErrorState] = useState(null);

  useScrollToTop(isContractOSAGO || undefined);

  useEffect(() => {
    if (isContractOSAGO) {
      if (isOrderRequested) {
        navigate('/order/get');
      } else {
        const setOrdersRequestStatus = async () => {
          try {
            setIsLoading(true);
            await requestOrderApi({
              epolicy: orderData.epolicyOrderId,
            });
            setIsOrderRequested(true);
          } catch (error) {
            setErrorState(error);
          } finally {
            setIsLoading(false);
          }
        };
        setOrdersRequestStatus();
      }
    }
  }, [
    isContractOSAGO,
    isOrderRequested,
    navigate,
    setIsOrderRequested,
    orderData?.epolicyOrderId,
  ]);

  useEffect(() => {
    getIpnBlackList();
  }, [getIpnBlackList]);

  return (
    <OutletPageWrapper className="formPage">
      <Wrapper>
        <CompanySmall />
        <Box sx={{ display: 'block' }}>
          <Stepper backLinkRef={backLinkRef} isLoading={isLoading} />
        </Box>
      </Wrapper>
    </OutletPageWrapper>
  );
};

export default FormPage;
