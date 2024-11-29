import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { useNotExistUser } from './hooks';
// import Stepper from './components/Stepper/Stepper.jsx';
// import OrderDataProvider from './context/OrderDataProvider.jsx';

const loadComponentWithRetry = (importFunc, retries = 3, interval = 1000) => {
  return lazy(
    () =>
      new Promise((resolve, reject) => {
        importFunc()
          .then(resolve)
          .catch((error) => {
            if (retries === 1) {
              reject(error);
            } else {
              setTimeout(() => {
                loadComponentWithRetry(importFunc, retries - 1, interval)
                  // .then(resolve)
                  // .catch(reject);
              }, interval);
            }
          });
      })
  );
};

const HomePage = loadComponentWithRetry(() => import('./pages/HomePage.jsx'));
const PricesPage = loadComponentWithRetry(() =>
  import('./pages/PricesPage.jsx')
);
const FormPage = loadComponentWithRetry(() => import('./pages/FormPage.jsx'));
const OrderPage = loadComponentWithRetry(() => import('./pages/OrderPage.jsx'));
const BaseSettings = loadComponentWithRetry(() =>
  import('./components/BaseSettings.jsx')
);

function App() {
  useNotExistUser();
  return (
    <>
      <Suspense fallback={null}>
        <BaseSettings />
      </Suspense>
      {/* <OrderDataProvider>
        <Stepper />
      </OrderDataProvider> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="prices" element={<PricesPage />} />
          <Route path="form" element={<FormPage />} />
          <Route path="order/:orderStage" element={<OrderPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
