import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SpriteSVG } from "../../images/SpriteSVG";

import { BoxImgS, ButtonS, FormContainerS } from "./BlockThankStyled";
import GeneralInput from "../GeneralInput/GeneralInput";
import PortmoneForm from "../PortmoneForm/PortmoneForm";
import { YellowButton } from "../../style/Global.styled";
import { getOrderPasswordApi, checkOrderPasswordApi } from "../../services/api";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { selectOrderData } from "../../redux/Global/selectors";
import { useActions } from "../../hooks/useActions";

export const orderMessagesKeys = {
  ORDER_GET: "order-get",
  ORDER_CHECK: "order-check",
  ORDER_PAYMENT: "order-payment",
  ORDER_EMMITED: "order-emmited",
};

const content = {
  [orderMessagesKeys.ORDER_GET]: {
    title: "Пройдіть верифікацію!",
    descr: "На ваш телефон буде надіслано смс з паролем.",
    btn: "Надіслати СМС",
  },
  [orderMessagesKeys.ORDER_CHECK]: {
    title: "Відправте пароль з СМС!",
    descr:
      "Введіть і відправте пароль отриманий в СМС для переходу на сторінку оплати!",
    btn: "Відправити пароль",
  },
  [orderMessagesKeys.ORDER_PAYMENT]: {
    icon: "icon-money",
    title: "Перейдіть на сторінку оплати!",
    descr:
      "Вам потрібно перейти на сторінку оплати для завершення оформлення договору",
    btn: "Portmone.com",
  },
  [orderMessagesKeys.ORDER_EMMITED]: {
    icon: "icon-check-circle",
    title: "Дякуємо за замовлення!",
    descr:
      "На Вашу електронну пошту надіслано проєкт договору/посилання на оплату.",
    btn: "На головну",
  },
};

const BlockThank = () => {
  const navigate = useNavigate();
  const orderData = useSelector(selectOrderData);
  const [search, setSearch] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: { password: "" },
  });

  const type = search.get("type");

  const nextStep = useCallback((type) => {
    setSearch({ type }, { replace: true });
  }, []);
  const goBack = useCallback(() => navigate(-1, { replace: true }), []);

  const handleOrderClick = () => {
    if (type === orderMessagesKeys.ORDER_GET) {
      setIsLoading(true);
      getOrderPasswordApi(orderData.orderId)
        .then(() => nextStep(orderMessagesKeys.ORDER_CHECK))
        .catch(() => {
          nextStep(orderMessagesKeys.ORDER_CHECK);
        })
        .finally(() => setIsLoading(false));
    }
    if (type === orderMessagesKeys.ORDER_CHECK) {
      setIsLoading(true);
      checkOrderPasswordApi({
        contractId: orderData.orderId,
        password: formik.values.password,
      })
        .then(() => nextStep(orderMessagesKeys.ORDER_PAYMENT))
        .catch(() => {
          goBack();
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    !type && setSearch({ type: orderMessagesKeys.ORDER_GET });
  }, []);

  return (
    <FormContainerS component="article">
      <BoxImgS>
        {(type === orderMessagesKeys.ORDER_EMMITED ||
          type === orderMessagesKeys.ORDER_PAYMENT) && (
          <SpriteSVG name={content[type].icon}></SpriteSVG>
        )}
        {type === orderMessagesKeys.ORDER_CHECK && (
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
        sx={{ marginBottom: { xs: "4px", sm: "8px" } }}
      >
        {type && content[type].title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: { xs: "16px", sm: "32px", lg: "48px" } }}
      >
        {type && content[type].descr}
      </Typography>
      {type && type === orderMessagesKeys.ORDER_EMMITED && (
        <ButtonS to={"/"}>{type && content[type].btn}</ButtonS>
      )}
      {(type === orderMessagesKeys.ORDER_GET ||
        type === orderMessagesKeys.ORDER_CHECK) && (
        <YellowButton onClick={handleOrderClick}>
          {type && content[type].btn}
        </YellowButton>
      )}
      {type === orderMessagesKeys.ORDER_PAYMENT && (
        <PortmoneForm
          billAmount={orderData.billAmount}
          shopOrderNumber={orderData.shopOrderNumber}
          emailAddress={orderData.email}
        />
      )}
    </FormContainerS>
  );
};

export default BlockThank;
