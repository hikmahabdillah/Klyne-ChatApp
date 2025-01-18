import { Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Contact = ({contact}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar w-max">
        <div className="size-12 rounded-full">
          <img
            src={contact?.profilePic || "/Avatar.svg"}
            alt="Avatar"
          />
        </div>
      </div>
      <div>
        <h2 className="text-lg text-slate-50 font-semibold leading-none">
          {contact.contactName}
        </h2>
        <p className="text-sm">Online</p>
      </div>
    </div>
  );
};

const ContactsPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 700);
  const { contacts, listContact, searchContact, isLoading } = useContactsStore();
  
  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      searchContact(debouncedValue); 
    } else {
      listContact(); 
    }
  }, [debouncedValue]);
  
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full flex md:items-center md:justify-center p-0 md:p-6 max-h-screen">
        <div className="w-full max-w-lg mx-auto p-4 md:border md:border-slate-50 rounded-xl shadow-lg flex flex-col">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF00E5] to-[#794CEB] text-transparent bg-clip-text pb-1">
            My Contacts
          </h1>
          {/* Search */}
          <label className="input input-bordered flex items-center gap-2 p-3 mt-3">
            <Search />
            <input 
              type="text" 
              value={search} 
              onChange={handleSearch} 
              className="grow" 
              placeholder="Search contact" 
            />
          </label>
          <p className="my-3">{contacts?.length} Contacts</p>
          <div className="flex flex-col gap-4 p-3 overflow-auto md:max-h-[400px] border border-neutral-700 rounded-lg">
            {!isLoading 
              ? contacts.map((item, index) => (
                  <Contact contact={item} key={index} />
                ))
              : "Loading..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
