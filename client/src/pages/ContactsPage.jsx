import { Search } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Contact = ({ contact }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar w-max">
        <div className="size-12 rounded-full">
          <img src={contact?.profilePic || "/Avatar.svg"} alt="Avatar" />
        </div>
      </div>
      <div>
        <h2 className="text-lg text-slate-50 font-semibold leading-none">
          {contact.contactName}
        </h2>
        <p className="text-sm">@{contact.contactId}</p>
      </div>
    </div>
  );
};

const User = ({ data }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar w-max">
        <div className="size-12 rounded-full">
          <img src={data?.profilePic || "/Avatar.svg"} alt="Avatar" />
        </div>
      </div>
      <div>
        <h2 className="text-lg text-slate-50 font-semibold leading-none">
          {data.fullName}
        </h2>
        <p className="text-sm">@{data.customId}</p>
      </div>
    </div>
  );
};

const ContactsPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 700);
  const { users, contacts, listContact, listUser, searchContact, isLoading } =
    useContactsStore();

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      searchContact(debouncedValue);
    } else {
      listContact();
      listUser();
    }
  }, [debouncedValue]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full flex md:items-center md:justify-center p-0 md:p-6 h-full max-h-screen">
        <div className="w-full max-w-lg mx-auto p-4 md:border md:border-slate-50 rounded-xl shadow-lg flex flex-col relative">
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
          {/* The button to open modal */}
          <label
            htmlFor="save-contact"
            className="btn absolute bottom-5 right-5"
          >
            Add Contact
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="save-contact" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box w-full max-w-lg mx-auto p-4 gap-4 md:border md:border-slate-50 rounded-xl shadow-lg flex flex-col">
              <h3 className="text-lg font-bold text-slate-50">Add Contact</h3>
              {/* Search */}
              <label className="input input-bordered flex items-center gap-2 p-3 mt-3">
                <Search />
                <input
                  type="text"
                  className="grow"
                  placeholder="Search id"
                />
              </label>
                <div className="flex flex-col gap-4 p-3 overflow-auto md:max-h-[400px] border border-neutral-700 rounded-lg">
            {!isLoading
              ? users.map((item, index) => (
                  <User data={item} key={index} />
                ))
              : "Loading..."}
          </div>
            </div>
            <label className="modal-backdrop" htmlFor="save-contact">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
