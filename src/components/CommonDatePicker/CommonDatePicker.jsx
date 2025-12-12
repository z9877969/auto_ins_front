import { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import {
  ButtonStyled,
  DataContainerStyled,
  // InputContStyled,
} from './CommonDatePicker.styled';

const CustomInputAsButton = forwardRef(function CustomInputAsButton(
  { value, onClick },
  ref
) {
  return (
    <ButtonStyled onClick={onClick} ref={ref}>
      {value}
    </ButtonStyled>
  );
});
CustomInputAsButton.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
};

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

CommonDatePicker.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  selected: PropTypes.any,
  onSelect: PropTypes.func,
  closeOnScroll: PropTypes.func,
  customInput: PropTypes.element,
  name: PropTypes.string,
  dateFormat: PropTypes.string,
  showIcon: PropTypes.any,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  startDate: PropTypes.any,
  locale: PropTypes.string,
  icon: PropTypes.any,
};

export default CommonDatePicker;
