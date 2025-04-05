import { useEffect } from 'react';
import { orderTypes } from '../data/orderTypes';
import { useLocation, useNavigate } from 'react-router-dom';

export const useCanBlockThankRender = ({ orderStage, orderData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      (orderStage !== orderTypes.ORDER_EMMITED && !orderData) ||
      (orderStage === orderTypes.ORDER_EMMITED && !location.search)
    ) {
      navigate('/');
    }
  }, [orderStage, orderData, location.search, navigate]);

  if (
    (orderStage !== orderTypes.ORDER_EMMITED && !orderData) ||
    (orderStage === orderTypes.ORDER_EMMITED && !location.search)
  ) {
    return false;
  }
  return true;
};
