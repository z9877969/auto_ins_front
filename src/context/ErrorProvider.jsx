import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// eslint-disable-next-line
const ErrorContext = createContext(null);

// eslint-disable-next-line
export const useErrorHandler = () => {
  return useContext(ErrorContext);
};

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const errorHandler = useCallback((error, advErrorData = {}) => {
    const newError = new Error(error.message);
    for (const key in advErrorData) {
      newError[key] = advErrorData[key];
    }
    setError(newError);
  }, []);

  useEffect(() => {
    if (error) {
      setError(null);
      throw error;
    }
  }, [error]);

  return (
    <ErrorContext.Provider value={errorHandler}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
