import { components } from 'react-select';
import PropTypes from 'prop-types';
import { useSelectOrInput } from '../../context/SelectOrInputProvider';

const SelectNoOptionsMessage = ({ children, ...props }) => {
  const selectOrInput = useSelectOrInput();

  const handleClick = () => {
    selectOrInput.setIsModelInput(true);
  };

  return (
    <components.NoOptionsMessage {...props}>
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        {children}
      </div>
    </components.NoOptionsMessage>
  );
};

SelectNoOptionsMessage.propTypes = {
  children: PropTypes.string,
};

export default SelectNoOptionsMessage;
