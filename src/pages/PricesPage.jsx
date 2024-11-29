import { useLocation, useNavigate } from 'react-router-dom';
import { CostCalculation } from '../components/CostCalculation/CostCalculation';
import { useEffect } from 'react';
import OutletPageWrapper from '../components/OutletPageWrapper';
import ProposalsFilter from '../components/ProposalsFilter/ProposalsFilter';
import CompanyList from '../components/CompanyList/CompanyList';
import { useSelector } from 'react-redux';
import { getSubmitObject } from '../redux/byParameters/selectors';
import {
  getStateCalculator,
  getStateNumber,
} from '../redux/Calculator/selectors';
import { LinearProgress } from '@mui/material';
import LineSection from '../components/LineSection/LineSection';

import ModalError from '../components/ModalError/ModalError';
import { getIsModalErrorOpen } from '../redux/Global/selectors';
import { useActions } from '../hooks/useActions';
import { ORDER_TYPE } from '../constants';
import { useScrollToTop } from 'hooks/useScrollToTop';

const PricesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { osagoByDn, setIsModalErrorOpen, osagoByParams } = useActions();

  const userParams = useSelector(getSubmitObject);
  const stateNumber = useSelector(getStateNumber);
  const isLoadingCalculator = useSelector(getStateCalculator);
  const isError = useSelector(getIsModalErrorOpen);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (
        // !Object.hasOwn(userParams, 'customerCategory') &&
        // eslint-disable-next-line
        !userParams.hasOwnProperty('customerCategory') &&
        stateNumber === ''
      ) {
        navigate('/');
        return;
      }
    }
    return () => {
      subscribed = false;
    };
  }, [navigate, userParams, stateNumber]);

  useEffect(() => {
    if (location.state?.params) {
      const getOsagoData = async () => {
        try {
          if (location.state.type === ORDER_TYPE.BY_PARAMS) {
            await osagoByParams(location.state.params).unwrap();
            return;
          }
          if (location.state.type === ORDER_TYPE.BY_LICENSE_PLATE) {
            await osagoByDn(location.state.params).unwrap();
            return;
          }
        } catch (error) {
          setIsModalErrorOpen(true);
        }
      };
      getOsagoData();
    } else {
      navigate('/');
    }
  }, [location.state, setIsModalErrorOpen, osagoByDn, osagoByParams, navigate]);

  if (isError) {
    return <ModalError />;
  }

  return (
    <>
      <OutletPageWrapper>
        <CostCalculation />
        <ProposalsFilter />
        <LineSection isLoading={isLoadingCalculator} />
        {isLoadingCalculator && <LinearProgress />}
        <CompanyList />
      </OutletPageWrapper>
    </>
  );
};
export default PricesPage;
