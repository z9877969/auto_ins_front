import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import "./index.css";
import { theme } from './theme.js';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorBoundary } from './ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  // {/* </ErrorBoundary> */}
  // </React.StrictMode>
);
