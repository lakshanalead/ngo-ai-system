import { useState } from "react";

function Chatbot() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleChat = () => {

    const userMessage =
      message.toLowerCase();

    if (
      userMessage.includes("food")
    ) {

      setReply(
        "Food assistance volunteers are being notified."
      );

    }

    else if (
      userMessage.includes("medical")
    ) {

      setReply(
        "Medical emergency team alerted."
      );

    }

    else if (
      userMessage.includes("flood")
    ) {

      setReply(
        "Flood rescue support activated."
      );

    }

    else if (
      userMessage.includes("volunteer")
    ) {

      setReply(
        "Nearby volunteers are being matched."
      );

    }

    else {

      setReply(
        "We are analyzing your request."
      );

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-5">
        AI Emergency Chatbot
      </h1>

      <input
        type="text"
        placeholder="Type your issue..."
        className="border p-3 w-full mb-4 text-black"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button
        onClick={handleChat}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      <div className="mt-5 p-4 bg-slate-800 rounded">

        <p>{reply}</p>

      </div>

    </div>
  );
}

export default Chatbot;