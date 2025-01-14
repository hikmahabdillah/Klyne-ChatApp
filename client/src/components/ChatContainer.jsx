const ChatContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
      <div className="chat chat-start">
        <div className="chat-header">
          <time className="text-xs opacity-70">12:45</time>
        </div>
        <div className="chat-bubble font-medium text-slate-50">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end">
        <div className="chat-header">
          <time className="text-xs opacity-70">12:46</time>
        </div>
        <div className="chat-bubble bg-gradient-to-r from-[#FF00E5] to-[#794CEB] font-medium text-slate-50">I hate you!</div>
      </div>
    </div>
  );
};

export default ChatContainer;
