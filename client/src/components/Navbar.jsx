import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <div>Navbar</div>

      <label className="btn btn-error" htmlFor="logout_modal">
        logout
      </label>
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

export default Navbar;
