import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './talkpage.css'; // Make sure to create a CSS file for styling

function TalkPage() {
  const { state } = useLocation();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessage = userInput.trim();
    if (!userMessage) return;

    // Display user message
    setMessages(messages => [...messages, { text: userMessage, sender: 'user' }]);
    setUserInput('');

    // Send question to your API endpoint
    const response = await fetch('/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userMessage, city: state.city }),
    });

    const data = await response.json();

    // Display bot response
    setMessages(messages => [...messages, { text: data.answer, sender: 'bot' }]);
  };

  return (
    <div className="chat-container">
      <h2>Let's talk about {state.city}</h2>
      <div className="messages-container">
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
          placeholder="Ask me anything about crime in your city..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default TalkPage;
