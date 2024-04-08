import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import ChatIcon from '../assets/robot.png';
import axios from 'axios';
function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm your virtual assistant.", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
  
    // Add user's message to the chat
    setMessages(prevMessages => [...prevMessages, { text: inputValue, isUser: true }]);
    setInputValue('');
  
    try {
      const response = await axios.post("http://localhost:9090/chatbot-prompt", {
        userPrompt: inputValue,
      });
  
      // Handle the response from the server
      const botResponse = response.data.botResponse;
  
      // Add bot's response to the chat
      setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error:', error.message);
  
      setMessages(prevMessages => [
        ...prevMessages,
        { text: "I'm sorry, but I'm currently unable to respond. Please try again later.", isUser: false, isError: true }
      ]);
    }
  };
  
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="avatar">
          <img src={ChatIcon} alt="Avatar" />
        </div>
        <div className="title">Virtual Assistant</div>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.isUser ? 'message user' : 'message bot'}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
