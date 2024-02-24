import React, { useState } from 'react';
import './chatpage.css'; // Assuming you'll create a CSS file for styling

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault(); // Prevent form submission
    if (!userInput.trim()) return; // Ignore empty messages
    setMessages([...messages, { id: Date.now(), text: userInput, sender: 'user' }]);
    setUserInput('');
    // Here, you can also add a function to process the user's message and add the chatbot's response
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
