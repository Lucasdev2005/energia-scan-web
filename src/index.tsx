import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { LoadingProvider } from './components/loading/loading';
import { ToastContainer } from 'react-toastify';
import GlobalProvider from './components/globalProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalProvider>
        <App />
    </GlobalProvider>
  </React.StrictMode>
);

reportWebVitals();