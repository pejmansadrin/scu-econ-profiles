// src/components/Header.jsx
import React from 'react';
import { config } from '../config';

export default function Header() {
  return (
    <header style={{ padding: '20px', backgroundColor: '#fff', textAlign: 'center', borderBottom: '1px solid #eee' }}>
      <h1>{config.associationName}</h1>
    </header>
  );
}