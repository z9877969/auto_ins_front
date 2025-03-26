import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import * as S from './BlockThankStyled';
import GeneralInput from 'components/GeneralInput/GeneralInput';
import PushNotification from 'components/PushNotification/PushNotification';
import CustomButtonLoading from 'components/Stepper/CustomButtonLoading';
import PortmoneForm from '../PortmoneForm/PortmoneForm';
import { SpriteSVG } from '../../../../images/SpriteSVG';
import {
  getOrderPasswordApi,
  checkOrderPasswordApi,
  requestOrderApi,
  confirmContractPaymentApi,
} from 'services/api';
import { selectOrderData } from '@redux/Global/selectors';
import { getUser } from '@redux/Calculator/selectors';
import { useActions } from 'hooks/useActions';
import { FORMIK_DATA_KEYS as formikDataKeys } from '../../../../constants';
import { orderTypes } from '../../data/orderTypes';
import { blockContent } from '../../data/blockContent';

const BlockThank = () => {
  const navigate = useNavigate();
  const actions = useActions();
  const orderData = useSelector(selectOrderData);
  const user = useSelector(getUser);
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
    if (orderStage === orderTypes.ORDER_GET) {
      if (errorMessage) return null;
      setIsLoading(true);
      try {
        await getOrderPasswordApi(orderData.epolicyOrderId);
        nextStep(orderTypes.ORDER_CHECK);
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        nextStep(orderTypes.ORDER_CHECK);
      } finally {
        setIsLoading(false);
      }
    }
    if (orderStage === orderTypes.ORDER_CHECK) {
      try {
        setIsLoading(true);
        await checkOrderPasswordApi({
          contractId: orderData.epolicyOrderId,
          password: formik.values.password,
        });
        if (!orderData.vclOrderId) {
          nextStep(orderTypes.ORDER_PAYMENT);
        } else {
          nextStep(orderTypes.ORDER_GET_VCL);
        }
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        // return goBack();
      } finally {
        formik.resetForm();
        setIsLoading(false);
      }
    }
    if (orderStage === orderTypes.ORDER_GET_VCL) {
      setIsLoading(true);
      try {
        await getOrderPasswordApi(orderData.vclOrderId);
        nextStep(orderTypes.ORDER_CHECK_VCL);
      } catch (error) {
        setErrorMessage(JSON.stringify(error, null, 2));
        nextStep(orderTypes.ORDER_CHECK_VCL);
      } finally {
        setIsLoading(false);
      }
    }
    if (orderStage === orderTypes.ORDER_CHECK_VCL) {
      try {
        setIsLoading(true);
        await checkOrderPasswordApi({
          contractId: orderData.vclOrderId,
          password: formik.values.password,
        });
        nextStep(orderTypes.ORDER_PAYMENT);
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
      if (orderStage === orderTypes.ORDER_EMMITED) {
        localStorage.removeItem(formikDataKeys.CAR);
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
      }
    };
    orderStage !== orderTypes.ORDER_EMMITED && setOrdersRequestStatus();
    // eslint-disable-next-line
  }, [orderData]);

  useEffect(() => {
    if (!user) return;
    const { paymentData } = user;
    /* 
      userId(pin):"102076"
      salePointId(pin):"41736"
      amount(pin):"3406.23"
      epolicy(pin):"17558295"
      orderId(pin):"CZGYPSAgA5"
      payDate(pin):"2025-02-19"
    */
    paymentData &&
      orderStage === orderTypes.ORDER_EMMITED &&
      confirmContractPaymentApi({
        contractId: paymentData.epolicy,
        amount: paymentData.amount,
        orderId: paymentData.orderId,
        payDate: paymentData.payDate,
      });
  }, [user, orderStage]);

  return (
    <S.FormWrapper component='article'>
      {errorMessage && (
        <PushNotification.Error
          message="Щось пішло не так🤷🏽‍♂️. Спробуйте ще або зв'яжіться з менеджером."
          onClose={() => setErrorMessage(null)}
          isOpen={Boolean(errorMessage)}
        />
      )}
      <S.BoxImg>
        {(orderStage === orderTypes.ORDER_EMMITED ||
          orderStage === orderTypes.ORDER_PAYMENT) && (
          <SpriteSVG name={blockContent[orderStage].icon}></SpriteSVG>
        )}
        {(orderStage === orderTypes.ORDER_CHECK ||
          orderStage === orderTypes.ORDER_CHECK_VCL) && (
          <GeneralInput
            id='password'
            lableText='Код:'
            type='text'
            color=''
            handleBlur={null}
            customFunc={null}
            placeholder='ХХХХХХ'
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
      </S.BoxImg>
      <Typography
        component='h2'
        variant='formTitle'
        sx={{ marginBottom: { xs: '4px', sm: '8px' } }}
      >
        {orderStage && blockContent[orderStage].title}
      </Typography>
      <Typography
        variant='body1'
        sx={{ marginBottom: { xs: '16px', sm: '32px', lg: '48px' } }}
      >
        {orderStage && blockContent[orderStage].descr}
      </Typography>
      {orderStage && orderStage === orderTypes.ORDER_EMMITED && (
        <S.Button to={'/'}>
          {orderStage && blockContent[orderStage].btn}
        </S.Button>
      )}
      {(orderStage === orderTypes.ORDER_GET ||
        orderStage === orderTypes.ORDER_CHECK ||
        orderStage === orderTypes.ORDER_GET_VCL ||
        orderStage === orderTypes.ORDER_CHECK_VCL) && (
        <CustomButtonLoading
          onCLick={handleOrderClick}
          btnTitle={orderStage && blockContent[orderStage].btn}
          isLoadingProp={isLoading}
        />
      )}
      {orderStage === orderTypes.ORDER_PAYMENT && (
        <PortmoneForm
          contractId={{
            epolicyId: orderData?.epolicyOrderId,
            vclId: orderData?.vclOrderId,
          }}
          billAmount={orderData?.billAmount}
          shopOrderNumber={orderData?.shopOrderNumber}
          emailAddress={orderData?.email}
        />
      )}
    </S.FormWrapper>
  );
};

export default BlockThank;
