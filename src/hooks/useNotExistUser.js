import { useSelector } from 'react-redux';
import { getUser } from '../redux/Calculator/selectors';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNotExistUser = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);

  useEffect(() => {
    !user && navigate('/');
  }, [user, navigate]);

  return null;
};
