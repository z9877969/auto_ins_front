import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPortmoneValue } from '../../helpers/getPortmoneValue';
import { getUser } from '@redux/Calculator/selectors';
import { setIsLoading } from '@redux/Global/globalSlice';
import { PORTMONE_URL } from '@constants/index';
import { getLinkInvoiceApi } from 'services/api';
import { createContractPaymentApi } from 'services/api';
import { getInvoiceTime } from 'helpers/portmone/getInvoiceTime';
import * as S from 'style/Global.styled';

/* 
    description = "Test Payment",
    emailAddress = "test@ukr.net",
    shopOrderNumber = "SHP-00445401",
    lang = "uk",
    payeeId = "3048",
    billAmount = "10",
    billCurrency = "UAH",
*/

const PortmoneForm = ({
  billAmount,
  contractId,
  shopOrderNumber = '',
  description = '',
  emailAddress = '',
  lang = 'uk',
  billCurrency = 'UAH',
  orderId,
}) => {
  const user = useSelector(getUser);

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
      orderId,
    })
  );

  useEffect(() => {
    localStorage.removeItem('carDataFormik');
    setIsLoading(true);
    const startPayment = async () => {
      try {
        const linkInvoice = await getLinkInvoiceApi({
          orderId,
          price: billAmount,
          shoperEmail: emailAddress,
          expDate: getInvoiceTime()

        });
        await createContractPaymentApi({
          contractId: contractId.epolicyId,
          amount: billAmount,
          orderId,
          linkInvoice,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    startPayment();
  }, [billAmount, contractId.epolicyId, emailAddress, orderId]);
  return (
    <form action={PORTMONE_URL} method='post' target='myFrame'>
      <input type='hidden' name='bodyRequest' value={value} />
      <input type='hidden' name='typeRequest' value='json' />

      <S.YellowButton type='submit'>Portmone.com</S.YellowButton>
    </form>
  );
};

export default PortmoneForm;
