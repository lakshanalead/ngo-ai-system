import { useState } from "react";
import axios from "axios";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant for NGO disaster management and volunteer coordination. Help users with emergencies, volunteer coordination, food shortages, disaster support, and NGO-related guidance.",
            },

            {
              role: "user",
              content: message,
            },
          ],
        },

        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = response.data.choices[0].message.content;

      const botMessage = {
        sender: "bot",
        text: botReply,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      const errorMessage = {
        sender: "bot",
        text: "Error connecting to AI service.",
      };

      setChat((prev) => [...prev, errorMessage]);
    }

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">
        NGO AI Chatbot
      </h1>

      <div className="bg-gray-900 p-4 rounded-lg h-[500px] overflow-y-auto">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.sender === "user"
                ? "text-right"
                : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-600"
                  : "bg-green-600"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-blue-600 px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;