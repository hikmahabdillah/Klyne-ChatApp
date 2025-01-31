const ChatBubble = ({ sendTime, chat, typeChat }) => {
  if (typeChat === "receive") {
    return (
      <div className="chat chat-start">
        <div className="chat-header">
          <time className="text-xs opacity-70">{sendTime}</time>
        </div>
        <div className="chat-bubble font-medium bg-primary text-primary-content">
          {chat}
        </div>
      </div>
    );
  } else if (typeChat === "send") {
    return (
      <div className="chat chat-end flex flex-col">
        <div className="chat-header">
          <time className="text-xs opacity-70">{sendTime}</time>
        </div>
        <div className="px-4 py-2 max-w-[90%] w-fit min-w-11 block relative rounded-xl rounded-br-none text-slate-50 bg-gradient-to-r from-[#FF00E5] to-[#794CEB] font-medium">
          {chat}
        </div>
      </div>
    );
  }

  return null;
};

export default ChatBubble;
