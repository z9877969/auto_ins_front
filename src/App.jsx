import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { loadComponentWithRetry } from 'helpers/loadComponentWithRetry';

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
  // useNotExistUser();
  return (
    <>
      <Suspense fallback={null}>
        <BaseSettings />
      </Suspense>
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
