import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { SpriteSVG } from "../../images/SpriteSVG";

import { BoxImgS, ButtonS, FormContainerS } from "./BlockThankStyled";
import GeneralInput from "../GeneralInput/GeneralInput";
import PortmoneForm from "../PortmoneForm/PortmoneForm";
import { YellowButton } from "../../style/Global.styled";
import { getOrderPasswordApi, checkOrderPasswordApi } from "../../services/api";
import { useFormik } from "formik";

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
  const [search, setSearch] = useSearchParams();
  const formik = useFormik({
    initialValues: { password: "123456" },
  });

  const type = search.get("type");

  const handleOrderClick = ({ orderId }) => {
    if (type === orderMessagesKeys.ORDER_GET) {
      getOrderPasswordApi(orderId)
        .then(() => setSearch({ type: "order-check" }))
        .catch(() => {
          // ПРИБРАТИ
          setSearch({ type: "order-check" });
        });
    }
    if (type === orderMessagesKeys.ORDER_CHECK) {
      checkOrderPasswordApi({ orderId, password: formik.values.password })
        .then(() => setSearch({ type: "order-payment" }))
        .catch(() => {
          // ПРИБРАТИ
          setSearch({ type: "order-payment" });
        });
    }
  };

  useEffect(() => {
    !type && setSearch({ type: orderMessagesKeys.ORDER_GET });
  }, []);

  const billAmount = 1500;
  const shopOrderNumber = "ORDER_NUMBER";

  return (
    <FormContainerS component="article">
      <BoxImgS>
        {(type === orderMessagesKeys.ORDER_EMMITED ||
          type === orderMessagesKeys.ORDER_PAYMENT) && (
          <SpriteSVG name={content[type].icon}></SpriteSVG>
        )}
        {type === orderMessagesKeys.ORDER_CHECK && (
          <GeneralInput
            id="block-thank-send-paassword"
            lableText="Пароль:"
            type="text"
            color=""
            handleBlur={null}
            customFunc={null}
            placeholder="ХХХХХХ"
            isDisabled={false}
            isReadOnly={false}
            formikData={{
              values: { password: "" },
              handleChange: null,
              errors: { password: "" },
              touched: { password: "" },
            }}
            className={orderMessagesKeys.ORDER_CHECK}
            style={{}}
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
          billAmount={billAmount}
          shopOrderNumber={shopOrderNumber}
        />
      )}
    </FormContainerS>
  );
};

export default BlockThank;
