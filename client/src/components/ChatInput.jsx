import { ImagePlus, Send } from "lucide-react";

const ChatInput = () => {
  return (
    <form
      id="sendMessage"
      className="flex items-center w-full p-1 pe-5 gap-4 pt-3 mb-3 border-t border-t-neutral/30"
    >
      <input type="text" placeholder="Type here" className="input input-bordered w-full" />
      <input type="file" name="image" id="image" hidden />
      <label htmlFor="image" className="cursor-pointer">
        <ImagePlus/>
      </label>
      <button type="submit">
        <Send/>
      </button>
    </form>
  );
};

export default ChatInput;
