import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import moment from "moment/moment";
import "react-datepicker/dist/react-datepicker.css";
import { uk } from "date-fns/locale";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import {
  DatePickerWrapper,
  FormStyled,
  InputStyled,
  InputWrapperStyled,
} from "./ByLicensePlate.styled";
import { SubmitButton } from "../ByParameters/ByParameters.styled";
import HelpCircle from "../HelpCircle/HelpCircle";
import { GeneralCheckbox } from "../GeneralCheckbox/GeneralCheckbox";
import { useLocation, useNavigate } from "react-router-dom";
import { DNUMBER_REGEX } from "../../constants";
import HelperList from "../HelpCircle/HelperList/HelperList";
import { useActions } from "../../hooks/useActions";
import { BoxImg } from "../BurgerMenu/BurgerMenuStyled";
import { SpriteSVG } from "../../images/SpriteSVG";
import { useSelector } from "react-redux";
import { getSubmitObject } from "../../redux/byParameters/selectors";
import { useState } from "react";
import { addDayToDate } from "../../helpers/addDayToDate";
const ByLicensePlate = () => {
  registerLocale("uk", uk);
  setDefaultLocale("uk");
  const navigate = useNavigate();
  const locationPath = useLocation();
  const {
    setAddress,
    setIsModalErrorOpen,
    setEngineCapacity,
    setAutoModelByMaker,
    setStateNumber,
    setAutoMakers,
    setSubmitObj,
  } = useActions();

  const [dateFrom, setDateFrom] = useState(
    moment(addDayToDate()).format("DD/MM/YYYY")
  );
  console.log(dateFrom);

  const handleChangeDate = (e) => {
    setDateFrom(moment(e).format("DD/MM/YYYY"));
  };
  console.log(dateFrom);

  const formik = useFormik({
    initialValues: {
      licensePlate: "",
      benefits: false,
      date: moment(dateFrom).format("YYYY-MM-DD"),
    },

    validateOnChange: false,
    onSubmit: (values) => {
      console.log(dateFrom);
      const stateNumber = values.licensePlate.match(DNUMBER_REGEX);
      if (!stateNumber) {
        setIsModalErrorOpen(true);
        return;
      }

      const params = {
        outsideUkraine: false,
        customerCategory: values.benefits ? "PRIVILEGED" : "NATURAL",
        stateNumber: values.licensePlate,
        dateFrom: moment(dateFrom, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };

      setAddress({ label: "", value: "" });
      setEngineCapacity({ label: "", value: "" });
      setAutoModelByMaker([]);
      setAutoMakers([]);
      setStateNumber(params.stateNumber);
      setSubmitObj(params);
      navigate("/prices", {
        state: { from: locationPath },
      });
    },
  });
  return (
    <div>
      <FormStyled onSubmit={formik.handleSubmit}>
        <InputWrapperStyled>
          <Box className="box">
            <Typography
              variant="body1"
              component="label"
              htmlFor="license-plate"
            >
              Номер транспортного засобу
              <HelpCircle lableText="Державний номерний знак" />
            </Typography>
            <InputStyled
              name="licensePlate"
              type="text"
              value={formik.values.licensePlate.trim().toUpperCase()}
              onChange={(e) => {
                const e2 = e.target.value.trim().toUpperCase();
                e.target.value = e2;
                formik.handleChange(e);
              }}
              id="license-plate"
              required
            />
          </Box>
          <Box className="box">
            <label htmlFor="dateFrom">Дата початку дії поліса:</label>
            <DatePickerWrapper
              id="dateFrom"
              value={dateFrom}
              closeOnScroll={(e) => e.target === document}
              onChange={handleChangeDate}
              name="date"
              dateFormat="DD/MM/YYYY"
              showIcon={true}
              minDate={addDays(new Date(), 1)}
              maxDate={addMonths(new Date(), 3)}
              startDate={dateFrom}
              locale="uk"
              icon={
                <Box className="iconCalender">
                  <SpriteSVG name={"icon-calendar"} />
                </Box>
              }
            />
          </Box>
        </InputWrapperStyled>

        <GeneralCheckbox
          lableText="Є пільги"
          name="benefits"
          val={formik.values.benefits}
          changeCB={formik.handleChange}
          helper={<HelperList />}
          className="checkbox"
        />
        <SubmitButton
          type="submit"
          disabled={!formik.values.licensePlate}
          className="button"
        >
          Розрахувати вартість
        </SubmitButton>
      </FormStyled>
    </div>
  );
};

export default ByLicensePlate;
