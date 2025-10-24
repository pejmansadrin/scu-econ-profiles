// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// ۱. فایل CSS بوت‌استرپ را وارد کن
// تغییر در اینجا: از .min.css به .rtl.min.css
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

// ۲. فایل‌های استایل سفارشی ما بعد از آن لود می‌شوند
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);