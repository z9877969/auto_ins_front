import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { createContractPaymentApi } from 'services/api';
import * as S from 'style/Global.styled';

const PortmoneForm = ({
  billAmount,
  contractId,
  emailAddress = '',
  orderId,
}) => {
  const navigate = useNavigate();
  const linkInvoiceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRedirectToPayment = (e) => {
    if (error) return null;
    e.preventDefault();

    location.href = linkInvoiceRef.current;
  };

  useEffect(() => {
    setIsLoading(true);
    const startPayment = async () => {
      try {
        linkInvoiceRef.current = await createContractPaymentApi({
          contractId: contractId.epolicyId,
          amount: billAmount,
          orderId,
          shoperEmail: emailAddress,
        });
        localStorage.removeItem('carDataFormik');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setError(error);
        alert('Щось пішло не так. Створіть нову заявку з коректними даними');
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };
    startPayment();
  }, [billAmount, contractId.epolicyId, emailAddress, orderId, navigate]);
  return (
    <S.YellowButton type="button" onClick={handleRedirectToPayment}>
      {isLoading ? <CircularProgress /> : 'Portmone.com'}
    </S.YellowButton>
  );
};

export default PortmoneForm;
