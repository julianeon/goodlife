// src/SplashPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/talk', { state: { username } }); // Navigate to chat page with username state
  };

  return (
    <div>
      <h1>Welcome to CrimeWave</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your city"
        />
        <button type="submit">City Name</button>
      </form>
    </div>
  );
}

export default SplashPage;
