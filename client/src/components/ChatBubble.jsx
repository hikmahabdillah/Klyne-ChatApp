const ChatBubble = ({ sendTime, chat, isSender, isSameSenderAsPrevious }) => {
  return (
    <div
      className={`chat ${isSameSenderAsPrevious ? "!mt-0 !pt-0" : "!mt-2"} ${
        isSender ? "chat-start" : "chat-end"
      }`}
    >
      <div
        className={`${
          isSender
            ? "chat-bubble font-medium bg-primary text-primary-content flex"
            : "px-4 py-2 max-w-[90%] w-fit min-w-11 relative rounded-xl rounded-br-none text-slate-50 bg-gradient-to-r from-[#FF00E5] to-[#794CEB] font-medium flex"
        }`}
      >
        {chat}
        <time className="ml-2 self-end text-xs opacity-70">{sendTime}</time>
      </div>
    </div>
  );
};

export default ChatBubble;
