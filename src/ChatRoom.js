import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";

function ChatRoom({ user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      user: user.displayName,
      timestamp: new Date()
    });

    setNewMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Welcome {user.displayName}</h3>
      <div style={{ marginBottom: "20px", height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map(msg => (
          <div key={msg.id}><strong>{msg.user}:</strong> {msg.text}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type your message..." 
          style={{ width: "80%" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
