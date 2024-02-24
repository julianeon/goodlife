import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashPage from './SplashPage';
import ChatPage from './ChatPage';
import TalkPage from './TalkPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/talk" element={<TalkPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
