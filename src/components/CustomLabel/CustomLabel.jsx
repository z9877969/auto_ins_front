import { useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { InputContStyled, LableStyled } from './CustomLabel.styled';

const CustomLabel = ({
  lableText,
  isDisabled = false,
  className,
  labelColor,
  touchedMessage,
  errorMessage,
  children,
  ref,
  errorposition,
  mustDefautErrorMessage = false,
}) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <InputContStyled
      className={className}
      ref={ref}
      errorposition={errorposition}
    >
      <LableStyled
        sx={{
          color: labelColor
            ? labelColor
            : isDisabled
            ? 'darkgray!important'
            : null,
        }}
        variant="inputLable"
        component="label"
      >
        <span>{lableText}</span>
        {touchedMessage && errorMessage && (
          <span className="errorMessage">
            {smScreen || !mustDefautErrorMessage
              ? errorMessage
              : 'Помилка введення'}
          </span>
        )}
      </LableStyled>
      {children}
    </InputContStyled>
  );
};

export default CustomLabel;

CustomLabel.propTypes = {
  lableText: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  labelColor: PropTypes.string,
  touchedMessage: PropTypes.bool,
  errorMessage: PropTypes.string,
  errorposition: PropTypes.object,
};
