import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import HelpCircle from '../HelpCircle/HelpCircle';
import { InputContStyled, SelectStyled } from './GeneralSelect.styled';
import { SpriteSVG } from '../../images/SpriteSVG';

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
  isEmpty = false,
  defaultValue,
  getOptionLabel,
  getOptionValue,
  // eslint-disable-next-line no-unused-vars
  isValid = true,
  readOnly = true,
  noOptionsMessage = '',
  optionsOnTop = false,
  handleSelectRef,
  components,
  errorMessage,
  placeholder,
  className,
  fullWidth = false,
  ...selectOptions
}) => {
  const selectRef = useRef(null);

  useEffect(() => {
    const inputRef = selectRef.current?.inputRef || null;

    if (inputRef) {
      if (!readOnly && inputRef.readOnly) {
        inputRef.removeAttribute('readonly');
      }
      if (readOnly && !inputRef.readOnly) {
        inputRef.setAttribute('readonly', '');
      }
    }
  }, [readOnly]);

  useEffect(() => {
    if (selectRef.current && handleSelectRef) {
      handleSelectRef(selectRef.current.inputRef);
    }
  }, [handleSelectRef]);
  // const theme = useTheme();
  return (
    <InputContStyled
      className={clsx('select-container', className && className)}
      errorposition={{ right: '15px' }}
    >
      <Typography
        sx={{
          color: isDisabled || isEmpty ? 'darkgray!important' : null,
          borderColor: isEmpty ? 'darkgray!important' : null,
          width: selectOptions.menuIsOpen ? 250 : 'none',
        }}
        variant="body1"
        component="label"
        htmlFor={id}
      >
        {lableText}
        {helper && <HelpCircle lableText={helper} color={color ? color : ''} />}
      </Typography>
      <SelectStyled
        fullWidth={fullWidth}
        ref={selectRef}
        $isValid={!errorMessage}
        $find={inputChangeCB}
        $optionsOnTop={optionsOnTop}
        components={
          inputChangeCB
            ? {
                DropdownIndicator: () => <SpriteSVG name="icon-zoom-out" />,
                ...components,
              }
            : components
        }
        isDisabled={isDisabled}
        noOptionsMessage={() => noOptionsMessage}
        variant="body1"
        component="label"
        classNamePrefix="customSelect"
        id={id}
        placeholder={placeholder ? placeholder : ''}
        options={optionsArr}
        defaultValue={defaultValue}
        value={currentValue}
        inputValue={inputValue}
        onInputChange={inputChangeCB}
        onChange={changeCB}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isMenuOpen={selectOptions.menuIsOpen}
        {...selectOptions}
      />
      {errorMessage && <span className="errorMessage">{errorMessage}</span>}
    </InputContStyled>
  );
};

export default GeneralSelect;

GeneralSelect.propTypes = {
  lableText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
  optionsOnTop: PropTypes.bool,
  ref: PropTypes.element,
  components: PropTypes.object,
  handleSelectRef: PropTypes.func,
};
