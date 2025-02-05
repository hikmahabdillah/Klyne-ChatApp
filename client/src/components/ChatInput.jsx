import { ImagePlus, Send } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const ChatInput = () => {
  const { sendMessage, selectedUser } = useChatStore();
  const [formData, setFormData] = useState({
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser?.contactRef || !formData.text.trim()) {
      return;
    }

    sendMessage(selectedUser.contactRef, formData);
    setFormData({ text: "" }); // Reset input setelah mengirim
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="sendMessage"
      className="flex items-center w-full p-1 pe-5 gap-4 pt-3 mb-3 border-t border-t-neutral/30"
    >
      <input
        value={formData.text}
        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
        name="text"
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        required
      />
      <input type="file" name="image" id="image" hidden />
      <label htmlFor="image" className="cursor-pointer">
        <ImagePlus />
      </label>
      <button type="submit">
        <Send />
      </button>
    </form>
  );
};

export default ChatInput;
