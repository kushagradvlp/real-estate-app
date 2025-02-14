import React, { useState } from "react";
import { Send, File, Copy, RefreshCw, ThumbsUp, ThumbsDown, Mic, Image, MoreVertical, Trash2 } from "lucide-react";
import App from "../App";
//import "../App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    // Add the user's message to the chat
    const userMsg = { text: input, user: "user", timestamp: new Date().toLocaleTimeString() };
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    
    // Save the current input before clearing
    const messageToSend = input;
    setInput("");
  
    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: messageToSend }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // If the backend returns an error, display it in the chat
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.error || "An error occurred.",
            user: "bot",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        // Display the bot's reply
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.reply,
            user: "bot",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      // Handle any network errors
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Network error: " + error.message,
          user: "bot",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };
  
  //const sendMessage = () => {
  //  if (!input.trim()) return;
//
  //  const newMessages = [...messages, { text: input, user: "user", timestamp: new Date().toLocaleTimeString() }];
  //  setMessages(newMessages);
  //  setInput("");
//
  //  // Simulating chatbot response
  //  setTimeout(() => {
  //    setMessages([...newMessages, { text: "I'm here to help!", user: "bot", timestamp: new Date().toLocaleTimeString() }]);
  //  }, 1000);
  //};

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">Chat with RealEstateAI</h2>
      
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col h-[600px] overflow-y-auto border border-gray-200 relative">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center mt-20">Start the conversation...</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`flex items-end my-4 ${msg.user === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-4 rounded-2xl max-w-lg text-lg shadow-md flex flex-col gap-2 transition-all transform ${
                msg.user === "user" ? "bg-blue-500 text-white self-end rounded-br-xl rounded-tl-xl" : "bg-gray-300 text-gray-900 self-start rounded-bl-xl rounded-tr-xl"
              }`}>
                <div className="flex justify-between w-full">
                  <span>{msg.user === "user" ? "You" : "RealEstateAI"}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="text-md font-medium">{msg.text}</p>
              </div>
            </div>
          ))
        )}
        {messages.length > 0 && (
          <button onClick={clearMessages} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
            <Trash2 size={20} />
          </button>
        )}
      </div>
      
      <div className="w-full max-w-3xl flex mt-4 bg-white shadow-lg rounded-full overflow-hidden border border-gray-300 items-center px-4 py-2">
        <button className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full">
          <File size={20} />
        </button>
        <button className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full ml-2">
          <Image size={20} />
        </button>
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 px-6 py-4 border-none focus:ring-0 text-gray-800 text-xl outline-none rounded-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="p-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full mr-2">
          <Mic size={20} />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-3 flex items-center justify-center transition-transform transform hover:scale-105 rounded-full"
          onClick={sendMessage}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
