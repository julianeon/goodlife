// src/SplashPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the city to the chat page using state
    navigate('/talk', { state: { city } });
  };

  return (
    <div>
      <h1>Welcome to CrimeTime</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city"
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
}

export default SplashPage;
