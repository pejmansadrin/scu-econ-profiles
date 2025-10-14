// src/components/Footer.jsx
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      marginTop: '40px', 
      color: 'rgba(255, 255, 255, 0.7)' 
    }}>
      <p>&copy; {currentYear} - کلیه حقوق محفوظ است.</p>
    </footer>
  );
}