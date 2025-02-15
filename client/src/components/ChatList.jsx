import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Chat from "./Chat";
import { Search } from "lucide-react";

const ChatList = () => {
  const { getChatList, isLoading, chatList, selectedUser, setSelectedUser } =
    useChatStore();

  useEffect(() => {
    getChatList();
  }, [getChatList]);

  return (
    <div className="box w-full h-full min-w-64 md:max-w-xs  p-3 flex flex-col gap-4  overflow-auto custom-scrollbar">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF00E5] to-[#794CEB] text-transparent bg-clip-text pb-1">
        Klyne
      </h1>
      {/* search */}
      <label className="input input-bordered flex items-center gap-2 p-3">
        <Search />
        <input type="text" className="grow" placeholder="Search chat" />
      </label>
      {/* list of chat */}
      <div className="flex flex-col gap-3">
        {/* chat */}
        {isLoading ? (
          <p className="text-center font-semibold">Loading...</p>
        ) : (
          chatList?.length > 0 &&
          chatList?.map((chat) => (
            <Chat
              data={chat}
              setSelectedUser={setSelectedUser}
              key={chat._id}
              selectedUser={selectedUser}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatList;
