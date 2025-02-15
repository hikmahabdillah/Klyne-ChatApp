import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  // const { detail, detailContact } = useContactsStore();

  // useEffect(() => {
  //   if (selectedUser) {
  //     detailContact(selectedUser?.contactId);
  //   }
  // }, [selectedUser, detailContact]);

  return (
    <div className="flex items-center justify-between w-full px-4 py-4 md:py-2 border-b border-b-neutral/20">
      <div className="flex items-center gap-3">
        <div className="avatar w-max relative">
          <div className="size-12 rounded-full">
            <img src={selectedUser?.profilePic || "/Avatar.svg"} alt="Avatar" />
          </div>
        </div>
        <div>
          <h2 className="text-lg  font-semibold leading-none">
            {selectedUser?.fullName}
          </h2>
          <p className="text-sm">
            {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <X
        className="cursor-pointer"
        onClick={() => {
          setSelectedUser(null);
        }}
      />
    </div>
  );
};

export default ChatHeader;
