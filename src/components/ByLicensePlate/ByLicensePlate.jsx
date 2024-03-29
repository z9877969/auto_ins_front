import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import {
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

import { SpriteSVG } from "../../images/SpriteSVG";
import { useState } from "react";
import format from "date-fns/format";
import CommonDatePicker from "../CommonDatePicker/CommonDatePicker";

const ByLicensePlate = () => {
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
    osagoByDn,
    autoByNumber,
    setAutoByNumber,
  } = useActions();

  const [dateFrom, setDateFrom] = useState(addDays(new Date(), 1));

  const formik = useFormik({
    initialValues: {
      licensePlate: "",
      benefits: false,
      date: dateFrom,
    },

    validateOnChange: false,
    onSubmit: (values) => {
      const stateNumber = values.licensePlate
        .trim()
        .toUpperCase()
        .match(DNUMBER_REGEX);
      if (!stateNumber) {
        setIsModalErrorOpen(true);
        return;
      }
      const params = {
        outsideUkraine: false,
        customerCategory: values.benefits ? "PRIVILEGED" : "NATURAL",
        stateNumber: values.licensePlate,
        dateFrom: format(dateFrom, "yyyy-MM-dd"),
      };
      setAutoByNumber([]);
      setAddress({ label: "", value: "" });
      setAutoModelByMaker([]);
      setAutoMakers([]);
      setStateNumber(params.stateNumber);
      setSubmitObj(params);
      autoByNumber(params.stateNumber);
      osagoByDn(params)
        .unwrap()
        .catch(() => {
          setIsModalErrorOpen(true);
        });
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
                formik.setFieldValue("licensePlate", e2);
                formik.handleChange(e);
              }}
              id="license-plate"
              required
            />
          </Box>
          <Box className="box">
            <CommonDatePicker
              id="dateFrom"
              label="Дата початку дії поліса:"
              selected={dateFrom}
              mode="single"
              onSelect={setDateFrom}
              closeOnScroll={(e) => e.target === document}
              name="date"
              dateFormat="dd/MM/yyyy"
              showIcon={true}
              minDate={addDays(new Date(), 1)}
              maxDate={addMonths(new Date(), 3)}
              startDate={dateFrom}
              locale="uk"
              withPortal
              icon={
                <Box className="iconCalender">
                  <SpriteSVG name="icon-calendar" />
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
        <SubmitButton type="submit" disabled={!formik.values.licensePlate}>
          Розрахувати вартість
        </SubmitButton>
      </FormStyled>
    </div>
  );
};

export default ByLicensePlate;
