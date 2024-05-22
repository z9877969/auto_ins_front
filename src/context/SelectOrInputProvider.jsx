import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const SelectOrInputContext = createContext();

// eslint-disable-next-line
export const useSelectOrInput = () => useContext(SelectOrInputContext);

// eslint-disable-next-line
const SelectOrInputProvider = ({ children }) => {
  const [isModelInput, setIsModelInput] = useState(false);

  const value = useMemo(() => {
    return { isModelInput, setIsModelInput };
  }, [isModelInput]);

  return (
    <SelectOrInputContext.Provider value={value}>
      {children}
    </SelectOrInputContext.Provider>
  );
};

SelectOrInputContext.propTypes = {
  children: PropTypes.node,
};

export default SelectOrInputProvider;
