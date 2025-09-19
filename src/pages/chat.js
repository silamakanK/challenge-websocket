import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Chat</h1>

      <div
        style={{
          border: "1px solid gray",
          height: 200,
          overflowY: "auto",
          marginBottom: 10,
          padding: 10,
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>User {m.id} :</b> {m.content}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écris un message..."
        style={{ marginRight: 10 }}
      />
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}
