import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

 
const ErrorContext = createContext(null);

// eslint-disable-next-line
export const useErrorHandler = () => {
  return useContext(ErrorContext);
};

// eslint-disable-next-line
export const useEventErrorWrapper = (componentName) => {
  const errorHandler = useErrorHandler();
  return useCallback(
    (cb, errorOptions = {}) =>
      async (...args) => {
        if (componentName) {
          errorOptions.component = componentName;
        }
        try {
          await cb(...args);
        } catch (error) {
          errorHandler(error.message, errorOptions);
        }
      },
    [errorHandler, componentName]
  );
};

export const WithErrorCatchHandler = (Component, componentName) => {
  const errorCatcherWrapper = useEventErrorWrapper(
    componentName ?? Component.name
  );

  const NewComponent = useCallback((props) => <Component {...props} />, []);

  return <>{errorCatcherWrapper(NewComponent)}</>;
};

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const errorHandler = useCallback((message, advErrorData = {}) => {
    const newError = new Error(message);
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
