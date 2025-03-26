import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ShortId from 'short-unique-id';
import {
  getPortmoneValue,
  createPaymentUrl,
} from '../../helpers/getPortmoneValue';
import * as S from 'style/Global.styled';
import { createContractPaymentApi } from 'services/api';
import { getUser } from '@redux/Calculator/selectors';
import { setIsLoading } from '@redux/Global/globalSlice';
import { PORTMONE_URL } from '@constants/index';

/* 
    description = "Test Payment",
    emailAddress = "test@ukr.net",
    shopOrderNumber = "SHP-00445401",
    lang = "uk",
    payeeId = "3048",
    billAmount = "10",
    billCurrency = "UAH",
*/

const shortId = new ShortId({ length: 10 });

const PortmoneForm = ({
  billAmount,
  contractId,
  shopOrderNumber = '',
  description = '',
  emailAddress = '',
  lang = 'uk',
  billCurrency = 'UAH',
}) => {
  const user = useSelector(getUser);
  const orderIdRef = useRef(shortId.rnd());

  const value = JSON.stringify(
    getPortmoneValue({
      description,
      emailAddress,
      billAmount,
      shopOrderNumber,
      lang,
      billCurrency,
      contractId,
      userId: user.user.id,
      salePointId: user.salePoint.id,
      orderId: orderIdRef.current,
    })
  );

  useEffect(() => {
    localStorage.removeItem('carDataFormik');
    setIsLoading(true);
    createContractPaymentApi({
      contractId: contractId.epolicyId,
      amount: billAmount,
      orderId: orderIdRef.current,
      linkInvoice: createPaymentUrl(value),
    })
      // eslint-disable-next-line
      .catch(console.log)
      .finally(() => {
        // actions.resetOrderData();
        setIsLoading(false);
      });
  }, [billAmount, contractId.epolicyId, value]);
  return (
    <form action={PORTMONE_URL} method='post' target='myFrame'>
      <input type='hidden' name='bodyRequest' value={value} />
      <input type='hidden' name='typeRequest' value='json' />

      <S.YellowButton type='submit'>Portmone.com</S.YellowButton>
    </form>
  );
};

export default PortmoneForm;
