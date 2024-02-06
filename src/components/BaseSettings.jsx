import { registerLocale, setDefaultLocale } from "react-datepicker";
import { uk } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const BaseSettings = () => {
  registerLocale("uk", uk);
  setDefaultLocale("uk");
  return null;
};

export default BaseSettings;
