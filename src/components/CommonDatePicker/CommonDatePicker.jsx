import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import {
  ButtonStyled,
  DataContainerStyled,
  InputContStyled,
} from "./CommonDatePicker.styled";

const CustomInputAsButton = forwardRef(({ value, onClick }, ref) => {
  return (
    <ButtonStyled onClick={onClick} ref={ref}>
      {value}
    </ButtonStyled>
  );
});

const CommonDatePicker = ({
  label,
  id,
  selected,
  onSelect,
  closeOnScroll,
  customInput,
  name,
  dateFormat,
  showIcon,
  minDate,
  maxDate,
  startDate,
  locale,
  icon,
  ...props
}) => {
  return (
    <DataContainerStyled>
      <label htmlFor={id}>{label}</label>
      <ReactDatePicker
        id={id}
        selected={selected}
        onSelect={onSelect}
        closeOnScroll={closeOnScroll}
        customInput={customInput ? customInput : <CustomInputAsButton />}
        name={name}
        dateFormat={dateFormat}
        showIcon={showIcon}
        minDate={minDate}
        maxDate={maxDate}
        startDate={startDate}
        locale={locale}
        withPortal
        icon={icon}
        {...props}
      />
    </DataContainerStyled>
  );
};

export default CommonDatePicker;
