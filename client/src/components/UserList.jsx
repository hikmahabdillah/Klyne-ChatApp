import { PlusCircle, Search, X } from "lucide-react";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const User = ({ data, selectedUserId, setSelectedUserId }) => {
  const { saveContact } = useContactsStore();
  const isUpdate = selectedUserId === data.customId;
  const [formData, setFormData] = useState({
    contactId: data.customId,
    contactName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveContact(formData);
    setSelectedUserId(null); // Tutup mode edit setelah simpan
    setFormData({ contactId: data.customId, contactName: "" });
  };

  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex items-center gap-3 flex-1 w-full">
        <div className="avatar w-max">
          <div className="size-12 rounded-full">
            <img src={data?.profilePic || "/Avatar.svg"} alt="Avatar" />
          </div>
        </div>

        {!isUpdate ? (
          <div>
            <h2 className="text-lg  font-semibold leading-none">
              {data.fullName}
            </h2>
            <p className="text-sm">@{data.customId}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full ">
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.contactName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactName: e.target.value,
                }))
              }
              placeholder="Contact Name"
            />
            <button type="submit" className="ml-2 btn btn-primary">
              Save
            </button>
          </form>
        )}
      </div>

      {!isUpdate ? (
        <PlusCircle
          className="cursor-pointer"
          onClick={() => setSelectedUserId(data.customId)}
        />
      ) : (
        <X className="cursor-pointer" onClick={() => setSelectedUserId(null)} />
      )}
    </div>
  );
};

const UserList = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 700);
  const { users, userList, searchUser, isLoading } = useContactsStore();
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      searchUser(debouncedValue);
    } else {
      userList();
    }
  }, [debouncedValue]);

  return (
    <>
      <input type="checkbox" id="add-contact" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box w-full max-w-lg mx-auto p-4 gap-4 md:border rounded-xl shadow-lg flex flex-col">
          <h3 className="text-lg font-bold ">Add Contact</h3>
          <label className="input input-bordered flex items-center gap-2 p-3 mt-3">
            <Search />
            <input
              type="text"
              className="grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search id"
            />
          </label>
          <div className="flex flex-col gap-4 p-3 overflow-auto md:max-h-[400px] border rounded-lg">
            {!isLoading ? (
              users?.length > 0 ? (
                users?.map((item, index) => (
                  <User
                    data={item}
                    key={index}
                    selectedUserId={selectedUserId}
                    setSelectedUserId={setSelectedUserId}
                  />
                ))
              ) : (
                <p className="text-center italic">No users found</p>
              )
            ) : (
              "Loading..."
            )}
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="add-contact">
          Close
        </label>
      </div>
    </>
  );
};

export default UserList;
