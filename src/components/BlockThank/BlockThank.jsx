import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { SpriteSVG } from '../../images/SpriteSVG';
import { BoxImgS, ButtonS, FormContainerS } from './BlockThankStyled';
import GeneralInput from '../GeneralInput/GeneralInput';
import PortmoneForm from '../PortmoneForm/PortmoneForm';
import {
  getOrderPasswordApi,
  checkOrderPasswordApi,
  requestOrderApi,
} from '../../services/api';
import { selectOrderData } from '../../redux/Global/selectors';
import { useActions } from '../../hooks/useActions';
import CustomButtonLoading from '../Stepper/CustomButtonLoading';

export const orderMessagesKeys = {
  ORDER_GET: 'get',
  ORDER_CHECK: 'check',
  ORDER_PAYMENT: 'payment',
  ORDER_EMMITED: 'emmited',
};

const content = {
  [orderMessagesKeys.ORDER_GET]: {
    title: 'Пройдіть верифікацію!',
    descr: 'На ваш телефон буде надіслано смс з паролем.',
    btn: 'Надіслати СМС',
  },
  [orderMessagesKeys.ORDER_CHECK]: {
    title: 'Відправте пароль з СМС!',
    descr:
      'Введіть і відправте пароль отриманий в СМС для переходу на сторінку оплати!',
    btn: 'Відправити пароль',
  },
  [orderMessagesKeys.ORDER_PAYMENT]: {
    icon: 'icon-money',
    title: 'Перейдіть на сторінку оплати!',
    descr:
      'Вам потрібно перейти на сторінку оплати для завершення оформлення договору',
    btn: 'Portmone.com',
  },
  [orderMessagesKeys.ORDER_EMMITED]: {
    icon: 'icon-check-circle',
    title: 'Дякуємо за замовлення!',
    descr: 'На Вашу електронну пошту надіслано договір страхування.',
    btn: 'На головну',
  },
};

const BlockThank = () => {
  const navigate = useNavigate();
  const actions = useActions();
  const orderData = useSelector(selectOrderData);
  const { orderStage } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { password: '' },
  });

  const nextStep = useCallback((orderStage) => {
    navigate('/order/' + orderStage, { replace: true });
  }, []);
  const goBack = useCallback(() => navigate(-1, { replace: true }), []);

  const handleOrderClick = async () => {
    if (orderStage === orderMessagesKeys.ORDER_GET) {
      setIsLoading(true);
      try {
        await getOrderPasswordApi(orderData.orderId);
        nextStep(orderMessagesKeys.ORDER_CHECK);
      } catch (error) {
        nextStep(orderMessagesKeys.ORDER_CHECK);
      } finally {
        setIsLoading(false);
      }
    }
    if (orderStage === orderMessagesKeys.ORDER_CHECK) {
      try {
        setIsLoading(true);
        await checkOrderPasswordApi({
          contractId: orderData.orderId,
          password: formik.values.password,
        });
        await requestOrderApi(orderData.orderId);
        nextStep(orderMessagesKeys.ORDER_PAYMENT);
      } catch (error) {
        goBack();
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.clearGlobal();
    };
  }, []);

  return (
    <FormContainerS component="article">
      <BoxImgS>
        {(orderStage === orderMessagesKeys.ORDER_EMMITED ||
          orderStage === orderMessagesKeys.ORDER_PAYMENT) && (
          <SpriteSVG name={content[orderStage].icon}></SpriteSVG>
        )}
        {orderStage === orderMessagesKeys.ORDER_CHECK && (
          <GeneralInput
            id="password"
            lableText="Пароль:"
            type="text"
            color=""
            handleBlur={null}
            customFunc={null}
            placeholder="ХХХХХХ"
            isDisabled={false}
            isReadOnly={false}
            formikData={{
              values: formik.values,
              handleChange: formik.handleChange,
              errors: formik.errors,
              touched: formik.touched,
            }}
          />
        )}
      </BoxImgS>
      <Typography
        component="h2"
        variant="formTitle"
        sx={{ marginBottom: { xs: '4px', sm: '8px' } }}
      >
        {orderStage && content[orderStage].title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: { xs: '16px', sm: '32px', lg: '48px' } }}
      >
        {orderStage && content[orderStage].descr}
      </Typography>
      {orderStage && orderStage === orderMessagesKeys.ORDER_EMMITED && (
        <ButtonS to={'/'}>{orderStage && content[orderStage].btn}</ButtonS>
      )}
      {(orderStage === orderMessagesKeys.ORDER_GET ||
        orderStage === orderMessagesKeys.ORDER_CHECK) && (
        <CustomButtonLoading
          onCLick={handleOrderClick}
          btnTitle={orderStage && content[orderStage].btn}
          isLoadingProp={isLoading}
        />
      )}
      {orderStage === orderMessagesKeys.ORDER_PAYMENT && (
        <PortmoneForm
          orderId={orderData?.orderId}
          billAmount={orderData?.billAmount}
          shopOrderNumber={orderData?.shopOrderNumber}
          emailAddress={orderData?.email}
        />
      )}
    </FormContainerS>
  );
};

export default BlockThank;
