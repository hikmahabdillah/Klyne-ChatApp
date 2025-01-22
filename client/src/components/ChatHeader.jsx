import { X } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b border-b-neutral/20">
      <div className="flex items-center gap-3">
        <div className="avatar w-max">
          <div className="size-12 rounded-full">
            <img src="https://i.pinimg.com/474x/52/bd/71/52bd712289bb44b492346a29affc376e.jpg" alt="Avatar" />
          </div>
        </div>
        <div>
          <h2 className="text-lg  font-semibold leading-none">Foden</h2>
          <p className="text-sm">Online</p>
        </div>
      </div>
      <X className="cursor-pointer"/>
    </div>
  );
};

export default ChatHeader;
