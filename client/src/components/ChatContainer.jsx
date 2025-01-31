import ChatBubble from "./ChatBubble";

const ChatContainer = () => {
  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-4">
      <ChatBubble typeChat={"receive"} sendTime={"12:00"} chat={"Hayoloo"}/>
      <ChatBubble typeChat={"send"} sendTime={"12:30"} chat={"Hayoloo"}/>
    </div>
  );
};

export default ChatContainer;
