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

const PricesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { osagoByDn, setIsModalErrorOpen } = useActions();

  const userParams = useSelector(getSubmitObject);
  const stateNumber = useSelector(getStateNumber);
  const isLoadingCalculator = useSelector(getStateCalculator);
  const isError = useSelector(getIsModalErrorOpen);

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (
        !Object.hasOwn(userParams, 'customerCategory') &&
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
          await osagoByDn(location.state.params).unwrap();
        } catch (error) {
          setIsModalErrorOpen(true);
        }
      };
      getOsagoData();
    } else {
      navigate('/');
    }
  }, [location.state?.params, setIsModalErrorOpen, osagoByDn, navigate]);

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
