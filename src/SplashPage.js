import React, { useState } from 'react';
import MapView from './MapView';
import './splashpage.css'; 

function SplashPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [city, setCity] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    setMessages(messages => [...messages, { text: trimmedInput, sender: 'user' }]);
    setUserInput('');

    if (!city) {
      setCity(trimmedInput);
      setMessages(messages => [...messages, { text: `Thanks! What would you like to know about crime in ${trimmedInput}?`, sender: 'bot' }]);
    } else {
      try {
        const response = await fetch('http://localhost:5000/question', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: trimmedInput, city: city }),
        });
        const data = await response.json();

        setMessages(messages => [...messages, { text: data.answer, sender: 'bot' }]);
      } catch (error) {
        console.error("Error fetching response:", error);
        setMessages(messages => [...messages, { text: "Sorry, I couldn't fetch the crime data.", sender: 'bot' }]);
      }
    }
  };

  return (
    <div className="chat-container">
      <MapView />
      <h2>Welcome to LiveGood</h2>
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="message bot">Please enter your city to start.</div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={city ? "Ask me anything..." : "Enter your city..."}
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default SplashPage;
