import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// ۱. فایل CSS بوت‌استرپ را وارد کن
import 'bootstrap/dist/css/bootstrap.min.css';

// ۲. فایل‌های استایل سفارشی ما بعد از آن لود می‌شوند
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);