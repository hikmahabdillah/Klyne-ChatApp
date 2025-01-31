const Chat = ({photo, name, lastText, lastChatTime,setSelectedUser, isOpen = false}) => {
  return (
    <div className={`flex items-center gap-3 p-2 relative ${isOpen && "ring-1 ring-base-300 bg-base-300 rounded-lg"}`} onClick={() => {setSelectedUser(name)}}>
      <div className="avatar w-max online before:bg-green-600">
        <div className="size-16 rounded-full">
          <img src={photo} />
        </div>
      </div>
      <div>
        <h2 className="text-lg  font-semibold">{name}</h2>
        <p className="text-sm truncate max-w-44 md:max-w-md">{lastText}</p>
      </div>
      <p className="absolute top-2 right-3">{lastChatTime}</p>
    </div>
  );
};

export default Chat;
