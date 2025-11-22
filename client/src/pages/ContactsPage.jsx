import Sidebar from "../components/Sidebar";
import { Delete, Plus, Search, Trash } from "lucide-react";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import UserList from "../components/UserList";

const Contact = ({ contact }) => {
  const { deleteContact, isLoading } = useContactsStore();

  const handleDelete = () => {
    console.log(contact.contactId);
    deleteContact(contact.contactId);
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-3 flex-1 w-full">
        <div className="avatar w-max">
          <div className="size-12 rounded-full">
            <img src={contact?.profilePic || "/Avatar.svg"} alt="Avatar" />
          </div>
        </div>
        <div>
          <h2 className="text-lg  font-semibold leading-none">
            {contact?.contactName}
          </h2>
          <p className="text-sm">@{contact?.contactId}</p>
        </div>
      </div>
      <label
        className="cursor-pointer tooltip tooltip-left font-medium  justify-self-end"
        data-tip="Delete Contact"
        htmlFor="delete_modal"
      >
        <Trash />
      </label>
      <ModalDelete handleDelete={handleDelete} isLoading={isLoading} />
    </div>
  );
};

const ModalDelete = ({ handleDelete, isLoading }) => {
  return (
    <>
      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-4 items-center justify-center">
          <h3 className="text-lg font-bold">
            Are you sure want to delete this contact
          </h3>
          <div className="flex justify-center items-center gap-5">
            <button
              className="btn btn-error"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {!isLoading ? "Delete" : "Loading..."}
            </button>
            <label className="btn " htmlFor="delete_modal">
              Close
            </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="delete_modal">
          Close
        </label>
      </div>
    </>
  );
};

const ContactsPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 700);
  const { contacts, contactList, searchContact, isLoading } =
    useContactsStore();

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      searchContact(debouncedValue);
    } else {
      contactList();
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
        <div className="w-full max-w-lg mx-auto p-4 md:border rounded-xl shadow-lg flex flex-col relative animate-scaleUp">
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
          {!isLoading ? (
            contacts?.length > 0 ? (
              <div className="flex flex-col gap-4 p-3 overflow-x-hidden overflow-y-auto md:max-h-[400px] border rounded-lg">
                {contacts.map((item, index) => (
                  <Contact contact={item} key={index} />
                ))}
              </div>
            ) : (
              <p className="text-center italic">No contacts found</p>
            )
          ) : (
            <p className="text-center italic">Loading...</p>
          )}
          {/* The button to open modal */}
          <label
            htmlFor="add-contact"
            className="tooltip btn p-2 pt-[10px] px-[10px] absolute bottom-10 right-10 md:-bottom-5 md:-right-5 rounded-full border-2"
            data-tip="Add Contact"
          >
            <Plus className="size-6" />
          </label>
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
