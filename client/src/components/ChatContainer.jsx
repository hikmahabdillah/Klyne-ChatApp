const ChatContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
      <div className="chat chat-start">
        <div className="chat-header">
          <time className="text-xs opacity-70">12:45</time>
        </div>
        <div className="chat-bubble font-medium bg-primary text-primary-content">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end flex flex-col">
        <div className="chat-header">
          <time className="text-xs opacity-70">12:46</time>
        </div>
        <div className="px-4 py-2 max-w-[90%] w-fit min-w-11 block relative rounded-xl rounded-br-none text-slate-50 bg-gradient-to-r from-[#FF00E5] to-[#794CEB] font-medium ">I hate you!</div>
      </div>
    </div>
  );
};

export default ChatContainer;
