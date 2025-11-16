// src/App.jsx (جدید)

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { config } from './config.js'; // برای استفاده از نام انجمن در هدر

// این کامپوننت اصلی برای صفحه root (/) است
function App() {
  return (
    <>
      <Header />
      <main style={{ 
        maxWidth: '800px', 
        margin: '20px auto', 
        padding: '40px 20px', 
        color: 'white', 
        textAlign: 'center',
        backgroundColor: 'rgba(74, 14, 25, 0.6)', // همان تم شیشه‌ای
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        border: '1px solid rgba(212, 175, 55, 0.3)'
      }}>
        <h2>به سامانه پروفایل اعضای انجمن علمی اقتصاد خوش آمدید</h2>
        <p style={{ marginTop: '2rem', fontSize: '1.1rem' }}>
          برای مشاهده لیست اعضا و امتیازات، به صفحه لیدربورد مراجعه کنید.
        </p>
        
        {/* این دکمه به صفحه لیدربورد لینک می‌دهد */}
        <a 
          href="/leaderboard.html" 
          className="btn" 
          style={{ 
            fontWeight: 'bold', 
            marginTop: '1rem', 
            backgroundColor: '#d4af37', // $primary-color
            borderColor: '#d4af37', 
            color: '#4a0e19', // $secondary-color
            padding: '0.75rem 1.5rem',
            fontSize: '1.1rem'
          }}
        >
          <i className="bi bi-trophy-fill me-2"></i>
          مشاهده لیدربورد
        </a>
      </main>
      <Footer />
    </>
  );
}

export default App;