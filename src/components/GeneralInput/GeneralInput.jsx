import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  InputContStyled,
  InputStyled,
  LableStyled,
} from './GeneralInput.styled';

const GeneralInput = ({
  id,
  lableText,
  type,
  color,
  handleBlur,
  customFunc,
  placeholder,
  isDisabled = false,
  isReadOnly = false,
  formikData: { values, handleChange, errors, touched },
  className,
  valueKey,
  mustDefaultErrorMessage = false,
  errorYPosition = 'bottom',
}) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <InputContStyled className={className}>
      <LableStyled
        sx={{
          color: isDisabled ? 'darkgray!important' : null,
        }}
        variant="inputLable"
        component="label"
        htmlFor={id}
      >
        <span>{lableText}</span>
        {touched[id] && errors[id] && (
          <span
            className={clsx(
              'errorMessages',
              errorYPosition === 'top' && 'errorMessageTop'
            )}
          >
            {smScreen || !mustDefaultErrorMessage
              ? errors[id]
              : 'Помилка введення'}
          </span>
        )}
      </LableStyled>
      <InputStyled
        name={id}
        type={type || 'text'}
        value={
          values[id] && typeof values[id] === 'object'
            ? values[id][valueKey]
            : values[id]
        }
        onChange={customFunc || handleChange}
        onBlur={handleBlur}
        id={id}
        color={color || 'inputBase'}
        error={touched[id] && Boolean(errors[id])}
        placeholder={placeholder}
        disabled={isDisabled}
        readOnly={isReadOnly}
      />
    </InputContStyled>
  );
};

export default GeneralInput;

GeneralInput.propTypes = {
  lableText: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.string,
  formikData: PropTypes.object,
  customFunc: PropTypes.func,
  placeholder: PropTypes.string,
  handleBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  className: PropTypes.string,
};
