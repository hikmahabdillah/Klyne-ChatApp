import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  const {
    selectedUser,
    messages,
    getMessages,
    listenNewMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const messagesEndRef = useRef(null);

  console.log(messages);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
      listenNewMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessages, listenNewMessages]);

  return (
    <div
      className="flex-1 overflow-y-auto w-full p-4 space-y-4"
      ref={messagesEndRef}
    >
      {messages.map((msg, index) => {
        const isSameSenderAsPrevious =
          index > 0 && messages[index - 1]?.senderId === msg.senderId;
        const isSender = msg.senderId === selectedUser?.contactRef;

        return (
          <>
            {msg.image && (
              <div
                className={`w-max flex flex-col gap-2 p-1 !mb-1 ${
                  isSender ? "mr-auto ml-3" : "ml-auto mr-3"
                }`}
                key={msg._id}
              >
                <img
                  src={msg.image}
                  alt=""
                  className="size-40 object-cover rounded-lg border"
                />
                <p
                  className={`text-xs ${isSender ? "self-start" : "self-end"}`}
                >
                  {formatTime(msg.createdAt)}
                </p>
              </div>
            )}
            {msg.text && (
              <ChatBubble
                key={index}
                isSender={isSender}
                sendTime={formatTime(msg.createdAt)}
                chat={msg.text}
                isSameSenderAsPrevious={isSameSenderAsPrevious}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default ChatContainer;
