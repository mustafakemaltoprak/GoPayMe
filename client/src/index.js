import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import './i18n';
import ScrollToTop from './components/ScrollToTop';
import { Loader } from 'semantic-ui-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);
root.render(
  
    <Provider store={store}>
      {/* <ScrollToTop /> */}
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
