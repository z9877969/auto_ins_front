import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Loader from "./components/Loader/Loader";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { uk } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import OrderPayment from "./components/OrderPayment/OrderPayment.jsx";
import { orderMessagesKeys } from "./components/BlockThank/BlockThank.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const PricesPage = lazy(() => import("./pages/PricesPage.jsx"));
const FormPage = lazy(() => import("./pages/FormPage.jsx"));

function App() {
  registerLocale("uk", uk);
  setDefaultLocale("uk");
  return (
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
        >
          <Route
            index
            element={<OrderPayment type={orderMessagesKeys.ORDER_EMMITED} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
