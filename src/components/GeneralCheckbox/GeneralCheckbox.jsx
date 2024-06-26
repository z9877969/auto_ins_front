import { FormControlLabel } from '@mui/material';
import {
  CheckboxContainerStyled,
  CheckboxStyled,
} from './GeneralCheckbox.styled';
import { SpriteSVG } from '../../images/SpriteSVG';
import HelpCircle from '../HelpCircle/HelpCircle';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

export const GeneralCheckbox = ({
  lableText = '', //текст елемента lable
  name, //ім’я імпута в формі (потрібне для коректної роботи formik)
  val, //значення чи вибраний імпут чи ні(boolian)
  changeCB, //функція що повертає вибране значення (піднесення)
  helper = '', //якщо текст присутній то показується елемент <HelpCircle/>
  color = '', //базовий колір для елемента
  isChecked = false,
  isDisabled = false,
}) => {
  const theme = useTheme();
  return (
    <CheckboxContainerStyled
      component="span"
      sx={{
        stroke: color ? color : theme.palette.primary.white,
        '& .MuiTypography-root.Mui-disabled': {
          color: color ? color : theme.palette.primary.white,
        },
        '& .MuiTypography-root': {
          color: color ? color : theme.palette.primary.white,
        },
      }}
    >
      <FormControlLabel
        control={
          <CheckboxStyled
            sx={{
              '& svg': {
                stroke: color ? color : theme.palette.primary.white,
                fill: 'transparent',
              },
            }}
            value={val}
            onChange={changeCB}
            type="checkbox"
            name={name}
            icon={<SpriteSVG name="icon-square" />}
            checkedIcon={<SpriteSVG name="icon-square-checked" />}
            // defaultChecked={isChecked}
            disabled={isDisabled}
            checked={isChecked}
          />
        }
        label={lableText}
      />
      {helper && <HelpCircle lableText={helper} color={color ? color : ''} />}
    </CheckboxContainerStyled>
  );
};

GeneralCheckbox.propTypes = {
  name: PropTypes.string,
  lableText: PropTypes.string,
  color: PropTypes.string,
  val: PropTypes.bool,
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  helper: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  changeCB: PropTypes.func,
};
