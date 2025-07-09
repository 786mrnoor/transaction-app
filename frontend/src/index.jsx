import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import './breakpoints.css';
import App from './app';
import { registerSW } from 'virtual:pwa-register'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


registerSW({ immediate: true });