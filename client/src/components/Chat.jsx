const Chat = ({photo, name, lastText, lastChatTime, isOpen = false}) => {
  return (
    <div className={`flex items-center gap-3 p-2 relative ${isOpen && "bg-neutral-700 rounded-lg"}`}>
      <div className="avatar w-max online">
        <div className="size-16 rounded-full">
          <img src={photo} />
        </div>
      </div>
      <div>
        <h2 className="text-lg text-slate-50 font-semibold">{name}</h2>
        <p>{lastText}</p>
      </div>
      <p className="absolute top-2 right-3">{lastChatTime}</p>
    </div>
  );
};

export default Chat;
