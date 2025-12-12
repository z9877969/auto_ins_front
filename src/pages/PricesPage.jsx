import { useLocation, useNavigate } from 'react-router-dom';
import { CostCalculation } from '../components/CostCalculation/CostCalculation';
import { useEffect, useState } from 'react';
import OutletPageWrapper from '../components/OutletPageWrapper';
import ProposalsFilter from '../components/ProposalsFilter/ProposalsFilter';
import CompanyList from '../components/CompanyList/CompanyList';
import { useSelector } from 'react-redux';
import { getSubmitObject } from '../redux/byParameters/selectors';
import {
  getStateCalculator,
  getStateNumber,
  // selectIsOpenPrivilageSupportModal,
  // selectIsPrivilagedExist,
} from '../redux/Calculator/selectors';
import { LinearProgress } from '@mui/material';
import LineSection from '../components/LineSection/LineSection';

import ModalError from '../components/ModalError/ModalError';
// import ModalErrorWithSupport from 'components/ModalErrorWIthSupport/ModalErrorWIthSupport';
import { getIsModalErrorOpen } from '../redux/Global/selectors';
import { useActions } from '../hooks/useActions';
import { ORDER_TYPE } from '../constants';
import { useScrollToTop } from 'hooks/useScrollToTop';
import RegistrationPlaceErrorModal from 'components/RegistrationPlaceErrorModal/RegistrationPlaceErrorModal';

const REGISTRATION_ERROR_MESSAGE = 'Неможлива тарифікація ТЗ по держ. номеру';

const PricesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const { osagoByDn, setIsModalErrorOpen, osagoByParams } = useActions();

  const userParams = useSelector(getSubmitObject);
  const stateNumber = useSelector(getStateNumber);
  const isLoadingCalculator = useSelector(getStateCalculator);
  const isError = useSelector(getIsModalErrorOpen);
  const [isRegistrationError, setIsRegistrationError] = useState(false);
  // const isPrivilegedExist = useSelector(selectIsPrivilagedExist);
  // const isOpenPrivilageSupportModal = useSelector(
  //   selectIsOpenPrivilageSupportModal
  // );

  useEffect(() => {
    let subscribed = true;
    if (subscribed) {
      if (
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
          const isRegistrationError = error.message
            .toLowerCase()
            .includes(REGISTRATION_ERROR_MESSAGE.toLowerCase());
          if (isRegistrationError) {
            setIsRegistrationError(true);
          } else {
            setIsModalErrorOpen(true);
          }
        }
      };
      getOsagoData();
    } else {
      navigate('/');
    }
  }, [
    location.state,
    setIsModalErrorOpen,
    osagoByDn,
    osagoByParams,
    // isPrivilegedExist,
    navigate,
  ]);

  // if ((isError && isPrivilegedExist) || isOpenPrivilageSupportModal) {
  //   return <ModalErrorWithSupport />;
  // }

  if (isRegistrationError) {
    return (
      <RegistrationPlaceErrorModal
        closeModal={() => setIsRegistrationError(false)}
        params={location.state?.params}
      />
    );
  }

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
