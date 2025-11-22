import { useAuthStore } from "../store/useAuthStore";

const Chat = ({ data, setSelectedUser, selectedUser }) => {
  const { onlineUsers } = useAuthStore();
  return (
    <div
      className={`flex items-center gap-3 p-2 relative ${
        (selectedUser?.customId === data?.customId ? data?.customId : null) &&
        "ring-1 ring-base-300 bg-base-300 rounded-lg"
      }`}
      onClick={() => {
        setSelectedUser(data);
      }}
    >
      <div
        className={`avatar w-max ${
          onlineUsers.includes(data?._id) ? "online before:bg-green-600" : ""
        }`}
      >
        <div className="size-16 rounded-full">
          <img src={data?.profilePic || "/Avatar.svg"} alt="Avatar" />
        </div>
      </div>
      <h2
        className={`${
          data?.isYourContact ? "font-semibold" : "text-primary italic"
        } text-lg`}
      >
        {data?.fullName}
      </h2>
    </div>
  );
};

export default Chat;
