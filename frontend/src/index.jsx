import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './breakpoints.css';
import { registerSW } from 'virtual:pwa-register';

import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
registerSW({ immediate: true });
