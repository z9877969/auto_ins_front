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
  userData,
}) => {
  const navigate = useNavigate();
  const linkInvoiceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRedirectToPayment = (e) => {
    e.preventDefault();
    if (error || isLoading) return null;

    location.href = linkInvoiceRef.current;
  };

  useEffect(() => {
    setIsLoading(true);
    const startPayment = async () => {
      try {
        linkInvoiceRef.current = await createContractPaymentApi({
          contractId: { epolicy: contractId.epolicyId, vcl: contractId.vclId },
          amount: { epolicy: billAmount.epolicy, vcl: billAmount.vcl },
          orderId: { epolicy: orderId.epolicy, vcl: orderId.vcl },
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
  }, [
    billAmount,
    contractId.epolicyId,
    contractId.vclId,
    emailAddress,
    orderId,
    navigate,
  ]);
  return (
    <form onSubmit={handleRedirectToPayment}>
      <input type="hidden" name="email" value={userData.email} />
      <input type="hidden" name="userName" value={userData.name} />
      <input type="hidden" name="userPhone" value={userData.phone} />
      <input type="hidden" name="userAddress" value={userData.address} />
      <S.YellowButton type="submit">
        {isLoading ? <CircularProgress /> : 'Portmone.com'}
      </S.YellowButton>
    </form>
  );
};

export default PortmoneForm;
