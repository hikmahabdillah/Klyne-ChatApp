import { ImagePlus, Send, X } from "lucide-react";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

const ChatInput = () => {
  const { sendMessage, selectedUser } = useChatStore();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage(selectedUser?._id, {
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      {imagePreview && (
        <div className="relative size-11 w-full  h-full max-h-20 p-2">
          <div className="absolute -top-2 left-14 p-1 bg-neutral-800 rounded-full">
            <X
              className="cursor-pointer size-5"
              onClick={() => setImagePreview("")}
            />
          </div>
          <img
            src={imagePreview}
            alt="Preview"
            className="size-16 rounded border border-neutral-300 object-cover"
          />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full p-3 gap-4 border-t border-neutral/30"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          <ImagePlus />
        </label>
        <button type="submit">
          <Send />
        </button>
      </form>
    </>
  );
};

export default ChatInput;
