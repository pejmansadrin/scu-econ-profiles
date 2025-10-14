// src/components/Header.jsx
import React from 'react';
import { config } from '../config';

export default function Header() {
  return (
    <header style={{ 
      padding: '20px', 
      backgroundColor: '#3b0b14', // Darker Zarashki color
      color: '#d4af37', // Gold color
      textAlign: 'center', 
      borderBottom: '2px solid #d4af37',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
    }}>
      <h1>{config.associationName}</h1>
    </header>
  );
}