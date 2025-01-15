import { ImagePlus, Send } from "lucide-react";

const ChatInput = () => {
  return (
    <form
      id="sendMessage"
      className="flex items-center w-full p-1 pe-5 bg-neutral-600 gap-4"
    >
      <input type="text" placeholder="Type here" className="input w-full" />
      <input type="file" name="image" id="image" hidden />
      <label htmlFor="image" className="cursor-pointer">
        <ImagePlus color="#fff"/>
      </label>
      <button type="submit">
        <Send color="#fff"/>
      </button>
    </form>
  );
};

export default ChatInput;
