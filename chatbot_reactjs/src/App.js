import React from 'react';
import './App.css';
import Chatbot from './components/ChatBot.js';
import ChatIcon from './assets/robot.png';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ASK ANYTHING !</h1>
      </header>
      <div className="chatbot-container">
        <Chatbot />
      </div>
      <div className="chat-icon">
        <img src={ChatIcon} width={50} alt="Chat Icon" />
      </div>
    </div>
  );
}

export default App;
