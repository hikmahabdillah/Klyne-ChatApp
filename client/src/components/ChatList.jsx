import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useContactsStore } from "../store/useContactsStore";
import Chat from "./Chat";
import { Search } from "lucide-react";

const ChatList = () => {
  const { contacts, contactList } = useContactsStore();
  const { selectedUser, setSelectedUser } = useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    contactList();
  }, [contactList])

  return (
    <div className="box w-full h-full min-w-80 md:max-w-sm  p-3 flex flex-col gap-4  overflow-auto custom-scrollbar">
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
            {contacts.length > 0 && contacts.map((contact) => (
              <Chat
                photo={contact.profilePic}
                name={contact.contactName}
                lastText={""}
                lastChatTime={""}
                setSelectedUser={setSelectedUser}
                key={contact._id}
                isOpen={selectedUser?._id === contact._id}
              />
            ))}
        </div>
      </div>
  );
};

export default ChatList;
