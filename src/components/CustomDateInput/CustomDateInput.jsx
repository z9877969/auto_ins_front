import PropTypes from 'prop-types';
import { InputStyled } from './CustomDateInput.styled';
import { useCallback } from 'react';

const CustomDateInput = ({
  type,
  color,
  handleBlur,
  placeholder,
  isDisabled = false,
  value,
  name,
  setValue,
  errorMessage,
}) => {
  const handleChange = useCallback(
    (e) => {
      const inputValue = e.target.value;

      // Видаляємо всі символи, які не є цифрами або слешами
      const formattedValue = inputValue.replace(/[^0-9/]/g, '');

      // Регулярний вираз для перевірки правильного формату дд/мм/рррр
      const datePattern = /^(\d{0,2})(\/?)(\d{0,2})(\/?)(\d{0,4})$/;
      const match = formattedValue.match(datePattern);

      if (match) {
        let day = match[1];
        let month = match[3];
        let year = match[5];

        // Корекція дня
        if (day.length === 1) {
          if (parseInt(day, 10) > 3) {
            day = '0' + day;
          }
        }
        if (day.length === 2) {
          if (parseInt(day, 10) > 31) {
            day = '31';
          } else if (parseInt(day, 10) < 1) {
            day = '01';
          }
        }

        // Корекція місяця
        if (month.length === 1) {
          if (parseInt(month, 10) > 1) {
            month = '0' + month;
          }
        }
        if (month.length === 2) {
          if (parseInt(month, 10) > 12) {
            month = '12';
          } else if (parseInt(month, 10) < 1) {
            month = '01';
          }
        }

        let newValue = day;
        if (month.length > 0) {
          newValue += '/' + month;
        }
        if (year.length > 0) {
          newValue += '/' + year;
        }

        setValue(newValue);
      }
    },
    [setValue]
  );

  return (
    <InputStyled
      name={name}
      type={type || 'text'}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={(e) => e.target.select()}
      color={color || 'inputBase'}
      placeholder={placeholder}
      disabled={isDisabled}
      error={Boolean(errorMessage)}
    />
  );
};

export default CustomDateInput;

CustomDateInput.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
};
