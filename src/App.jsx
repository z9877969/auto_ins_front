import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PricesPage = lazy(() => import("./pages/PricesPage.jsx"));
const FormPage = lazy(() => import("./pages/FormPage.jsx"));
const OrderPage = lazy(() => import("./pages/OrderPage.jsx"));
const BaseSettings = lazy(() => import("./components/BaseSettings.jsx"));

function App() {
  return (
    <>
      <Suspense fallback={null}>
        <BaseSettings />
      </Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="prices"
            element={
              <Suspense fallback={<Loader />}>
                <PricesPage />
              </Suspense>
            }
          />
          <Route
            path="form"
            element={
              <Suspense fallback={<Loader />}>
                <FormPage />
              </Suspense>
            }
          />
          <Route
            path="order/:orderStage"
            element={
              <Suspense fallback={<Loader />}>
                <OrderPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
