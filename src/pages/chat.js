import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../app/globals.css";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetch("api/socket");

    socket = io({ path: "/api/socketio" });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;
    if (!user) return alert("Vous devez être connecté");

    const msgData = {
      content: message,
      userId: user.id,
    };

    socket.emit("send_message", msgData);
    setMessage("");
    console.log("Message envoyé:", msgData);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full max-w-2xl mx-auto">
      <div className="bg-green-600 text-white p-4 font-bold shadow-md">
        Mini Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => {
          const isMine = user && m.userId === user.id;
          console.log('isine!! ',isMine);

          return (
            <div
              key={i}
              className={`flex flex-col max-w-[70%] ${
                isMine ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              <span className="text-xs text-gray-500 mb-1">
                {m.userName || `User ${m.userId}`}
              </span>

              <div
                className={`px-4 py-2 rounded-lg text-sm shadow-md ${
                  isMine
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center p-4 border-t bg-white">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris un message..."
          className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}