import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useLocation } from 'react-router-dom'


const Sidebar = () => {
  const { logout } = useAuthStore();
  const location = useLocation();

  const activeClass = (path) => {
    return (location.pathname === path ? "p-2 rounded-lg rounded-tl-none bg-neutral-700 border-l-4 border-[#794CEB]" : "")
  }

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen min-w-max pb-2">
      <div className="flex flex-col gap-4 items-center p-2">
        <img src="./Main Logo.svg" alt="Logo Klyne" width="45px" />
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <Link to="/" className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass('/')}`} data-tip="Chat Messages"><img src="./Messages.svg" alt="" width="37px" /></Link>
        <Link to="#" className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass('#')}`} data-tip="Archived Chat"><img src="/Archived.svg" alt="" width="37px" /></Link>
        <Link to="/contacts" className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass('/contacts')}`} data-tip="Contacts"><img src="/Contacts.svg" alt="" width="37px" /></Link>
      </div>
      <div className="flex flex-col gap-4 items-center p-2">
        <Link to="/settings" className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass('/settings')}`} data-tip="Settings"><img src="./Settings.svg" alt="" width="37px" /></Link>
        <Link to="/profile" className={`tooltip tooltip-right font-medium text-slate-50 ${activeClass('/profile')}`} data-tip="Profile"><img className="size-9 object-cover rounded-full" src="https://i.pinimg.com/736x/79/91/14/799114671e44914759d41f8dc1fa16f8.jpg" alt="" width="37px" /></Link>
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <label className="cursor-pointer tooltip tooltip-right font-medium text-slate-50" data-tip="Logout" htmlFor="logout_modal"><img src="/Logout.svg" alt="" width="37px" /></label>
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
