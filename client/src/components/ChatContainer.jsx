import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  const { selectedUser, messages, getMessages } = useChatStore();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?.contactRef);
    }
  }, [selectedUser, getMessages]);

  return (
    <div
      className="flex-1 overflow-y-auto w-full p-4 space-y-4"
      ref={messagesEndRef}
    >
      {messages.map((msg, index) => {
        const isSameSenderAsPrevious =
          index > 0 && messages[index - 1]?.senderId === msg.senderId;

        return (
          <ChatBubble
            key={index}
            typeChat={
              msg.senderId === selectedUser?.contactRef ? "receive" : "send"
            }
            sendTime={formatTime(msg.createdAt)}
            chat={msg.text}
            isSameSenderAsPrevious={isSameSenderAsPrevious} // True jika pengirimnya sama dengan pesan sebelumnya
          />
        );
      })}
    </div>
  );
};

export default ChatContainer;
