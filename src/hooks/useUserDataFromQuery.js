import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { setUserDataAction } from '@redux/Calculator/calculatorSlice';

export const useUserDataFromQuery = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const paymentData = useMemo(() => {
    if (!location.search || location.pathname !== '/order/emmited') return null;
    let search = location.search;
    if (search?.includes('~and~')) {
      search = search.split('~and~').join('&');
    }
    const { userId, salePointId, ...rest } = queryString.parse(location.search);

    return { userId, salePointId, ...rest };
  }, [location.search, location.pathname]);

  paymentData &&
    dispatch(
      setUserDataAction({
        userId: paymentData.userId,
        salePointId: paymentData.salePointId,
        paymentData,
      })
    );

  return paymentData;
};
