import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfileCard from './components/ProfileCard'; // We'll use this for the profile page view
import { config } from './config.js';

const API_URL = `/data/${config.dataFileName}`;

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL).then(res => res.json()).then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const userId = window.location.hash.substring(1);
      if (userId) {
        const user = users.find(u => u.id === userId);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    };
    if (!loading) handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [loading, users]);

  return (
    <>
      <Header />
      <main style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
        {loading ? <p>Loading...</p> : (
          currentUser ? <ProfileCard user={currentUser} /> : <HomePage users={users} />
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
