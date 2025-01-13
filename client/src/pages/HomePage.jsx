import { Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

const HomePage = () => {
  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full h-full bg-[#323131] flex">
        <div className="box w-full h-full md:max-w-sm border-r-2 border-slate-600 p-3 flex flex-col gap-4  overflow-auto">
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
          <Chat photo="https://i.pinimg.com/474x/52/bd/71/52bd712289bb44b492346a29affc376e.jpg" name="Foden" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="12:45" isOpen={true}/>
          <Chat photo="https://i.pinimg.com/236x/54/a7/b5/54a7b5bd106f01d30fb07640d2b6388f.jpg" name="Havertz" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="10:45"/>
          <Chat photo="https://i.pinimg.com/236x/be/5d/5d/be5d5da733bc896642fbe99eb6a903fc.jpg" name="Sancho" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="10:45"/>
          <Chat photo="https://i.pinimg.com/236x/c9/c0/d9/c9c0d9ad77d8738b9d41cf83b40513d2.jpg" name="Kaka" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="12:45"/>
          <Chat photo="https://i.pinimg.com/236x/2a/c8/16/2ac8166eebc2b783c0fc0e490c8f3271.jpg" name="Pedri" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="12:45"/>
          <Chat photo="https://i.pinimg.com/474x/8c/39/27/8c39271cd7ee1c21116182530483fc7d.jpg" name="Vicha" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="12:45"/>
          <Chat photo="https://i.pinimg.com/236x/ff/36/11/ff36110d4836640597368ed397a25e10.jpg" name="Son Heung" lastText="Lorem ipsum dolor sit amet consectetur" lastChatTime="12:45"/>
          </div>
        </div>
        <div className="hidden md:flex box w-full"></div>
      </div>
    </div>
  );
};

export default HomePage;
