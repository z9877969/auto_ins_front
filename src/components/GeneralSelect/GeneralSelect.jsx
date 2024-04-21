import { InputContStyled, SelectStyled } from './GeneralSelect.styled';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import HelpCircle from '../HelpCircle/HelpCircle';
import { SpriteSVG } from '../../images/SpriteSVG';
import { useEffect, useRef } from 'react';

const GeneralSelect = ({
  id,
  lableText, //текст елемента lable
  optionsArr, //масив елементів які відображає SElect
  helper = '', //якщо текст присутній то показується елемент <HelpCircle/>
  color = '', //базовий колір для елемента <HelpCircle/>
  changeCB, //функція що повертає вибране значення (піднесення)
  currentValue,
  inputChangeCB,
  inputValue,
  isDisabled = false,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  isValid = true,
  readOnly = true,
  noOptionsMessage = '',
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    if (selectRef.current.inputRef && readOnly) {
      selectRef.current.inputRef.setAttribute('readonly', true);
    }
  }, []);
  // const theme = useTheme();
  return (
    <InputContStyled className="select-container">
      <Typography
        sx={{
          color: isDisabled ? 'darkgray!important' : null,
        }}
        variant="body1"
        component="label"
        htmlFor={id}
      >
        {lableText}
        {helper && <HelpCircle lableText={helper} color={color ? color : ''} />}
      </Typography>
      <SelectStyled
        ref={selectRef}
        $isValid={isValid}
        $find={inputChangeCB}
        components={
          inputChangeCB
            ? { DropdownIndicator: () => <SpriteSVG name="icon-zoom-out" /> }
            : true
        }
        isDisabled={isDisabled}
        noOptionsMessage={() => noOptionsMessage}
        variant="body1"
        component="label"
        classNamePrefix="customSelect"
        id={id}
        placeholder="Enter the text"
        options={optionsArr}
        defaultValue={defaultValue}
        value={currentValue}
        inputValue={inputValue}
        onInputChange={inputChangeCB}
        onChange={changeCB}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
      />
    </InputContStyled>
  );
};
export default GeneralSelect;
GeneralSelect.propTypes = {
  lableText: PropTypes.string.isRequired,
  currentValue: PropTypes.object,
  id: PropTypes.string.isRequired,
  helper: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inputValue: PropTypes.string,
  color: PropTypes.string,
  isDisabled: PropTypes.bool,
  optionsArr: PropTypes.array.isRequired,
  changeCB: PropTypes.func,
  inputChangeCB: PropTypes.func,
  defaultValue: PropTypes.object,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  isValid: PropTypes.bool,
  readOnly: PropTypes.bool,
  noOptionsMessage: PropTypes.string,
};
