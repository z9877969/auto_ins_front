import { createContext, useContext, useState } from 'react';

const OrderDataContext = createContext();
const OrderDataSeterContext = createContext();

const orderDataKeys = {
  CONTACTS: 'contacts',
  ADDRESS: 'address',
  INSURER_DATA: 'insurerData',
  CAR_DATA: 'carData',
};

const iS = {
  [orderDataKeys.CONTACTS]: null,
  [orderDataKeys.INSURER_DATA]: null,
  [orderDataKeys.ADDRESS]: null,
  [orderDataKeys.CAR_DATA]: null,
};

// eslint-disable-next-line
export const useOrderDataSeter = () => useContext(OrderDataSeterContext);
// eslint-disable-next-line
export const useOrderData = () => useContext(OrderDataContext);

const OrderDataProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(iS);
  return (
    <OrderDataContext.Provider value={orderData}>
      <OrderDataSeterContext.Provider value={setOrderData}>
        {children}
      </OrderDataSeterContext.Provider>
    </OrderDataContext.Provider>
  );
};

export default OrderDataProvider;
