import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProfileCard from './components/ProfileCard';
import { config } from './config.js';

const API_URL = `/data/${config.dataFileName}`;

// Function to calculate user level based on points
const calculateLevel = (points, thresholds) => {
  let level = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (points >= thresholds[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
};

// --- New Function to Calculate Entry Year ---
const calculateEntryYear = (id) => {
  if (id.startsWith('9')) {
    return `13${id.substring(0, 2)}`;
  } else if (id.startsWith('4')) {
    return `1${id.substring(0, 3)}`;
  }
  return 'نامشخص'; // Fallback for other cases
};
// --- End of New Function ---

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        // --- Updated Processing Logic ---
        const processedUsers = data.map(user => {
          const totalPoints = user.activities.reduce((sum, activity) => sum + activity.points, 0);
          const userLevel = calculateLevel(totalPoints, config.levelThresholds);
          const entryYear = calculateEntryYear(user.id); // Calculate entry year
          
          return {
            ...user,
            points: totalPoints,
            level: userLevel,
            entryYear: entryYear, // Add calculated year to user object
          };
        });
        // --- End of Logic ---
        
        setUsers(processedUsers);
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