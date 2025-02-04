import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  const { selectedUser, messages, getMessages } = useChatStore();
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };
  console.log(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser?.contactRef);
    }
  }, [selectedUser, getMessages]);

  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
      {messages.map((msg, index) => (
        <ChatBubble
          key={index}
          typeChat={
            msg.senderId === selectedUser?.contactRef ? "receive" : "send"
          }
          sendTime={formatTime(msg.createdAt)}
          chat={msg.text}
        />
      ))}
    </div>
  );
};

export default ChatContainer;
