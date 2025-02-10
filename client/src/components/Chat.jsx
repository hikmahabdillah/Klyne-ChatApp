import { useAuthStore } from "../store/useAuthStore";

const Chat = ({ data, setSelectedUser, selectedUser }) => {
  const { onlineUsers } = useAuthStore();
  return (
    <div
      className={`flex items-center gap-3 p-2 relative ${
        (selectedUser?.contactId === data?.contactId
          ? data?.contactId
          : null) && "ring-1 ring-base-300 bg-base-300 rounded-lg"
      }`}
      onClick={() => {
        setSelectedUser(data);
      }}
    >
      <div
        className={`avatar w-max ${
          onlineUsers.includes(data?.contactRef)
            ? "online before:bg-green-600"
            : ""
        }`}
      >
        <div className="size-16 rounded-full">
          <img src={data?.profilePic || "/Avatar.svg"} alt="Avatar" />
        </div>
      </div>
      <h2 className="text-lg  font-semibold">{data?.contactName}</h2>
    </div>
  );
};

export default Chat;
