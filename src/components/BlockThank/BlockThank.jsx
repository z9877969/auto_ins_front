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
import PushNotification from '../PushNotification/PushNotification';
import { setToLS } from '../../helpers/storage';
import { FORMIK_DATA_KEYS as formikDataKeys } from '../../constants';

// eslint-disable-next-line
export const orderMessagesKeys = {
  ORDER_GET: 'get',
  ORDER_CHECK: 'check',
  ORDER_GET_VCL: 'get-vcl',
  ORDER_CHECK_VCL: 'check-vcl',
  ORDER_PAYMENT: 'payment',
  ORDER_EMMITED: 'emmited',
  ORDER_ERROR: 'error',
};

const content = {
  [orderMessagesKeys.ORDER_GET]: {
    title: 'Підтвердіть укладання договору!',
    descr: 'На ваш телефон буде надіслано повідомлення з кодом.',
    btn: 'Надіслати СМС',
  },
  [orderMessagesKeys.ORDER_CHECK]: {
    title: 'Введіть код з повідомлення',
    descr:
      'Введіть і відправте код з повідомлення отриманого в вайбер або смс(6 цифр, відправник EUA)',
    btn: 'Відправити код',
  },
  [orderMessagesKeys.ORDER_GET_VCL]: {
    title: 'Підтвердіть придбання додаткового покриття.',
    descr: 'На ваш телефон буде надіслано повідомлення з кодом.',
    btn: 'Надіслати СМС',
  },
  [orderMessagesKeys.ORDER_CHECK_VCL]: {
    title: 'Введіть код з повідомлення',
    descr:
      'Введіть і відправте код з повідомлення отриманого в вайбер або смс(6 цифр, відправник EUA) для переходу на сторінку оплати!',
    btn: 'Відправити код',
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
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: { password: '' },
  });

  const nextStep = useCallback((orderStage) => {
    navigate('/order/' + orderStage, { replace: true });
    // eslint-disable-next-line
  }, []);

  // const goBack = useCallback(() => navigate(-1, { replace: true }), []);

  const handleOrderClick = async () => {
    if (orderStage === orderMessagesKeys.ORDER_GET) {
      setIsLoading(true);
      try {
        await getOrderPasswordApi(orderData.epolicyOrderId);
        nextStep(orderMessagesKeys.ORDER_CHECK);
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        nextStep(orderMessagesKeys.ORDER_CHECK);
      } finally {
        setIsLoading(false);
      }
    }
    if (orderStage === orderMessagesKeys.ORDER_CHECK) {
      try {
        setIsLoading(true);
        await checkOrderPasswordApi({
          contractId: orderData.epolicyOrderId,
          password: formik.values.password,
        });
        if (!orderData.vclOrderId) {
          // await requestOrderApi({
          //   epolicy: orderData.epolicyOrderId,
          // });
          nextStep(orderMessagesKeys.ORDER_PAYMENT);
        } else {
          nextStep(orderMessagesKeys.ORDER_GET_VCL);
        }
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        // return goBack();
      } finally {
        formik.resetForm();
        setIsLoading(false);
      }
    }
    if (orderStage === orderMessagesKeys.ORDER_GET_VCL) {
      setIsLoading(true);
      try {
        await getOrderPasswordApi(orderData.vclOrderId);
        nextStep(orderMessagesKeys.ORDER_CHECK_VCL);
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        nextStep(orderMessagesKeys.ORDER_CHECK_VCL);
      } finally {
        setIsLoading(false);
      }
    }
    if (orderStage === orderMessagesKeys.ORDER_CHECK_VCL) {
      try {
        setIsLoading(true);
        await checkOrderPasswordApi({
          contractId: orderData.vclOrderId,
          password: formik.values.password,
        });
        // await requestOrderApi({
        //   epolicy: orderData.epolicyOrderId,
        //   vcl: orderData.vclOrderId,
        // });
        nextStep(orderMessagesKeys.ORDER_PAYMENT);
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        // return goBack();
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      actions.clearGlobal();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      if (orderStage === orderMessagesKeys.ORDER_EMMITED) {
        Object.values(formikDataKeys).forEach((key) => setToLS(key, null));
      }
    };
  }, [orderStage]);

  useEffect(() => {
    const setOrdersRequestStatus = async () => {
      try {
        setIsLoading(true);
        await requestOrderApi({
          epolicy: orderData.epolicyOrderId,
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
        setErrorMessage((err) => (err ? null : err));
      }
    };
    setOrdersRequestStatus();
  }, [orderData]);

  return (
    <FormContainerS component="article">
      {errorMessage && (
        <PushNotification.Error
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
          isOpen={Boolean(errorMessage)}
        />
      )}
      <BoxImgS>
        {(orderStage === orderMessagesKeys.ORDER_EMMITED ||
          orderStage === orderMessagesKeys.ORDER_PAYMENT) && (
          <SpriteSVG name={content[orderStage].icon}></SpriteSVG>
        )}
        {(orderStage === orderMessagesKeys.ORDER_CHECK ||
          orderStage === orderMessagesKeys.ORDER_CHECK_VCL) && (
          <GeneralInput
            id="password"
            lableText="Код:"
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
        orderStage === orderMessagesKeys.ORDER_CHECK ||
        orderStage === orderMessagesKeys.ORDER_GET_VCL ||
        orderStage === orderMessagesKeys.ORDER_CHECK_VCL) && (
        <CustomButtonLoading
          onCLick={handleOrderClick}
          btnTitle={orderStage && content[orderStage].btn}
          isLoadingProp={isLoading}
        />
      )}
      {orderStage === orderMessagesKeys.ORDER_PAYMENT && (
        <PortmoneForm
          orderId={{
            epolicyId: orderData?.epolicyOrderId,
            vclId: orderData?.vclOrderId,
          }}
          billAmount={orderData?.billAmount}
          shopOrderNumber={orderData?.shopOrderNumber}
          emailAddress={orderData?.email}
        />
      )}
    </FormContainerS>
  );
};

export default BlockThank;
