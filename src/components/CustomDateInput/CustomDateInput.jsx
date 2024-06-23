import PropTypes from 'prop-types';
import { InputStyled } from './CustomDateInput.styled';

const CustomDateInput = ({
  type,
  color,
  handleBlur,
  placeholder,
  isDisabled = false,
  value,
  name,
  setValue,
}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Видаляємо всі символи, які не є цифрами або слешами
    const formattedValue = inputValue.replace(/[^0-9/]/g, '');

    // Регулярний вираз для перевірки правильного формату дд/мм/рррр
    const datePattern = /^(\d{0,2})(\/?)(\d{0,2})(\/?)(\d{0,4})$/;
    const match = formattedValue.match(datePattern);

    if (match) {
      const day = match[1];
      const month = match[3];
      const year = match[5];

      let newValue = day;
      if (month.length > 0) {
        newValue += '/' + month;
      }
      if (year.length > 0) {
        newValue += '/' + year;
      }

      setValue(newValue);
    }
  };

  return (
    <InputStyled
      name={name}
      type={type || 'text'}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      color={color || 'inputBase'}
      placeholder={placeholder}
      disabled={isDisabled}
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
