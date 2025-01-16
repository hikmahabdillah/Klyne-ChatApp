import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation } from 'react-router-dom'

const IconMenu = ({linkTo, icon, activeClass, dataTip, authUser}) => {
  const Icon = () => {
    return (
      (dataTip === 'Profile') ? <img
        className="size-8 md:size-9 object-cover rounded-full"
        src={authUser?.profilePic || "/Avatar.svg"}
        alt="User Profile"
      />: <img src={`/${icon}.svg`} className="size-8 md:size-9" alt="" width="37px" />
    );
  };

  return (
    <Link to={linkTo} className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass(linkTo)}`} data-tip={dataTip}><Icon/></Link>
  )
}

const Sidebar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const activeClass = (path) => {
    return (location.pathname === path ? "p-2 rounded-lg rounded-tl-none bg-neutral-700 border-l-4 border-[#794CEB]" : "")
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen min-w-max pt-3 md:pt-0 pb-2">
      <div className="flex flex-col gap-4 items-center p-2">
        <img src="./Main Logo.svg" alt="Logo Klyne" width="45px" />
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <IconMenu
            linkTo="/"
            icon="Messages"
            activeClass={activeClass}
            dataTip="Chat Messages"
          />
          <IconMenu
            linkTo="/contacts"
            icon="Contacts"
            activeClass={activeClass}
            dataTip="Contacts"
          />
        </div>
        <div className="flex flex-col gap-4 items-center p-0 md:p-2">
          <IconMenu
            linkTo="/settings"
            icon="Settings"
            activeClass={activeClass}
            dataTip="Settings"
          />
          <IconMenu
            linkTo="/profile"
            icon="Profile"
            activeClass={activeClass}
            dataTip="Profile"
            authUser={authUser}
          />
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <label className="cursor-pointer tooltip tooltip-right font-medium text-slate-50" data-tip="Logout" htmlFor="logout_modal"><img src="/Logout.svg" className="size-8 md:size-9" alt="" width="37px" /></label>
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
        <label className="btn text-white" htmlFor="logout_modal">
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
