import { getPortmoneValue } from '../../helpers/getPortmoneValue';
import { YellowButton } from '../../style/Global.styled';

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
  orderId,
  shopOrderNumber = '',
  description = '',
  emailAddress = '',
  lang = 'uk',
  billCurrency = 'UAH',
}) => {
  const value = JSON.stringify(
    getPortmoneValue({
      description,
      emailAddress,
      billAmount,
      shopOrderNumber,
      lang,
      billCurrency,
      orderId,
    })
  );
  return (
    <form
      action="https://www.portmone.com.ua/gateway/"
      method="post"
      target="myFrame"
    >
      <input type="hidden" name="bodyRequest" value={value} />
      <input type="hidden" name="typeRequest" value="json" />

      <YellowButton type="submit">Portmone.com</YellowButton>
    </form>
  );
};

export default PortmoneForm;
