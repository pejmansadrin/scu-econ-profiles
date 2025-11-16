// src/leaderboard.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// به کامپوننت تغییر نام یافته اشاره می‌کند
import LeaderboardApp from './LeaderboardApp.jsx';

// ۱. فایل CSS بوت‌استرپ را وارد کن
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

// ۲. فایل‌های استایل سفارشی ما بعد از آن لود می‌شوند
import './assets/scss/main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LeaderboardApp />
  </React.StrictMode>,
);