import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation } from 'react-router-dom'
import { LogOut, Contact, MessageCircle, Settings } from "lucide-react";

const IconMenu = ({linkTo, Icon, activeClass, dataTip, authUser}) => {
  const IconDisplay = () => {
    return (
      (dataTip === 'Profile') ? <img
        className="size-7 md:size-8 object-cover rounded-full"
        src={authUser?.profilePic || "/Avatar.svg"}
        alt="User Profile"
      />: <Icon className="size-7 md:size-8" />
    );
  };

  return (
    <Link to={linkTo} className={`tooltip tooltip-right font-medium  ${activeClass(linkTo)}`} data-tip={dataTip}><IconDisplay/></Link>
  )
}

const Sidebar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const activeClass = (path) => {
    return (location.pathname === path ? "p-2 rounded-lg rounded-tl-none border-l-4 " : "")
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen min-w-max pt-3 md:pt-0 pb-2 border-r border-r-neutral/20">
      <div className="flex flex-col gap-4 items-center p-2">
        <img src="./Main Logo.svg" alt="Logo Klyne" width="45px" />
        <div className="w-full border border-neutral/20 h-[0.25px]"/>
        <IconMenu
            linkTo="/"
            Icon={MessageCircle}
            activeClass={activeClass}
            dataTip="Chat Messages"
          />
          <IconMenu
            linkTo="/contacts"
            Icon={Contact}
            activeClass={activeClass}
            dataTip="Contacts"
          />
        </div>
        <div className="flex flex-col gap-4 items-center p-0 md:p-2 w-full">
          <IconMenu
            linkTo="/settings"
            Icon={Settings}
            activeClass={activeClass}
            dataTip="Settings"
          />
          <IconMenu
            linkTo="/profile"
            Icon="Profile"
            activeClass={activeClass}
            dataTip="Profile"
            authUser={authUser}
          />
        <div className="w-full border border-neutral/20 h-[0.5px]"/>
        <label className="cursor-pointer tooltip tooltip-right font-medium " data-tip="Logout" htmlFor="logout_modal"><LogOut className="size-7 md:size-8"/></label>
      </div>
      </div>
      <input type="checkbox" id="logout_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-4 items-center justify-center">
          <h3 className="text-lg font-bold">Are you sure want to logout?</h3>
          <div className="flex justify-center items-center gap-5">
            <button
              className="btn btn-error"
              onClick={() => {
                logout();
              }}
            >
              Confirm
            </button>
        <label className="btn " htmlFor="logout_modal">
          Close
        </label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="logout_modal">
          Close
        </label>
      </div>
    </>
  );
};

export default Sidebar;
