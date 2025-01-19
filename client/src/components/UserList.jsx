import { Search } from "lucide-react";
import { useContactsStore } from "../store/useContactsStore";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

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

const UserList = () => {
  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 700);
  const { users, userList, searchUser, isLoading } =
    useContactsStore();

  useEffect(() => {
    if (debouncedValue.trim() !== "") {
      searchUser(debouncedValue);
    } else {
      userList();
    }
  }, [debouncedValue]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
  };


  return(
    <>
 {/* Put this part before </body> tag */}
 <input type="checkbox" id="save-contact" className="modal-toggle" />
 <div className="modal" role="dialog">
   <div className="modal-box w-full max-w-lg mx-auto p-4 gap-4 md:border md:border-slate-50 rounded-xl shadow-lg flex flex-col">
     <h3 className="text-lg font-bold text-slate-50">Add Contact</h3>
     {/* Search */}
     <label className="input input-bordered flex items-center gap-2 p-3 mt-3">
       <Search />
       <input type="text" className="grow" value={search} onChange={handleSearch} placeholder="Search id" />
     </label>
     <div className="flex flex-col gap-4 p-3 overflow-auto md:max-h-[400px] border border-neutral-700 rounded-lg">
       {!isLoading
         ? users.map((item, index) => <User data={item} key={index} />)
         : "Loading..."}
     </div>
   </div>
   <label className="modal-backdrop" htmlFor="save-contact">
     Close
   </label>
 </div>
 </>
  )
}

export default UserList;