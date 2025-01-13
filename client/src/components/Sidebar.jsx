import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen w-max">
      <div className="flex flex-col gap-4 items-center p-4">
        <img src="./Main Logo.svg" alt="Logo Klyne" width="45px" />
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <a href="#" className="tooltip tooltip-right tooltip-info" data-tip="Chat Messages"><img src="./Messages.svg" alt="" width="37px" /></a>
        <a href="#" className="tooltip tooltip-right tooltip-info" data-tip="Archived Chat"><img src="./Archived.svg" alt="" width="37px" /></a>
        <a href="#" className="tooltip tooltip-right tooltip-info" data-tip="Contacts"><img src="./Contacts.svg" alt="" width="37px" /></a>
      </div>
      <div className="flex flex-col gap-4 items-center p-4">
        <a href="#" className="tooltip tooltip-right tooltip-info" data-tip="Settings"><img src="./Settings.svg" alt="" width="37px" /></a>
        <a href="#" className="tooltip tooltip-right tooltip-info" data-tip="Profile"><img className="size-10 object-cover rounded-full" src="https://i.pinimg.com/736x/79/91/14/799114671e44914759d41f8dc1fa16f8.jpg" alt="" width="37px" /></a>
        <div className="w-full bg-slate-50 h-[0.5px]"/>
        <label className="cursor-pointer tooltip tooltip-right tooltip-info" data-tip="Logout" htmlFor="logout_modal"><img src="./Logout.svg" alt="" width="37px" /></label>
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
