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
      <p>&copy; {currentYear} - All rights reserved.</p>
      <p>
        Developed by{' '}
        <a 
          href="https://github.com/pejmansadrin" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold' }}
        >
          pejmansadrin
        </a>
      </p>
    </footer>
  );
}