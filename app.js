import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    setWs(socket);

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (input.trim() && ws) {
      ws.send(input);
      setInput("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Real-Time Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">{msg}</div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
