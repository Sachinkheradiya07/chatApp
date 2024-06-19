import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatsPage() {
  const [chats, setChats] = useState([]);

  const fetchChat = async () => {
    try {
      const response = await axios.get("/api/chat");
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChat();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
}
