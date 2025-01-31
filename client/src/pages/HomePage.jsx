import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";
import { useChatStore } from "../store/useChatStore";
import NoChatSelected from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full h-full flex">
        <ChatList />
        {/* CHAT Messages */}
        {!selectedUser ? (
          <NoChatSelected />
        ) : (
          <div className="hidden md:flex box w-full overflow-auto flex-1 flex-col">
            <ChatHeader />
            <ChatContainer />
            <ChatInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
