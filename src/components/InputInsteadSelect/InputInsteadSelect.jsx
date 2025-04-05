import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';
import GeneralInput from '../GeneralInput/GeneralInput';
import CancelIcon from '@mui/icons-material/CancelOutlined';

const InputInsteadSelect = ({
  formik,
  onChange,
  name,
  label,
  closeInput,
  valueKey, // key of input value if this value consisted in select options
}) => {
  return (
    <Box display={'flex'} width={'100%'} alignItems={'center'} columnGap={1}>
      <Box flexGrow={1}>
        <GeneralInput
          id={name}
          lableText={label}
          formikData={formik}
          customFunc={onChange}
          placeholder={'Вкажіть модель авто'}
          valueKey={valueKey}
        />
      </Box>
      {closeInput && (
        <IconButton
          size="large"
          sx={{ color: '#FCD922', transform: 'translateY(40%)' }}
          onClick={closeInput}
        >
          <CancelIcon />
        </IconButton>
      )}
    </Box>
  );
};

InputInsteadSelect.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  closeInput: PropTypes.func,
};

export default InputInsteadSelect;
