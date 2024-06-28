import { useEffect, useState } from "react";
import useSignalR from "@/hook/useSignalR"; // Adjust import path as needed

interface ChatComponentProps {
  userId: string | null;
}

const Chat: React.FC<ChatComponentProps> = ({ userId }) => {
  console.log("========================", userId);

  const { connection, messages, sendMessage } = useSignalR(
    userId,
    "receptionists"
  );

  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput);
      setMessageInput("");
    }
  };

  useEffect(() => {
    // Optionally handle userId change or any additional setup
  }, [userId]);

  useEffect(() => {
    // Optionally handle messages or connection changes
    // For example, scroll to the bottom of messages div
  }, [messages, connection]);

  return (
    <div>
      <h2>{userId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
