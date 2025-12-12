import { useSelector } from 'react-redux';
import { getUser } from '../redux/Calculator/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDataFromQuery } from './useUserDataFromQuery';

export const useNotExistUser = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const paymentData = useUserDataFromQuery();

  useEffect(() => {
    if (paymentData) return;
    !user && navigate('/');
  }, [user, navigate, paymentData]);

  return null;
};
