import { IdCard, ImageUp, Mail, UserRound } from "lucide-react";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full flex items-center justify-center p-6">
        <div className="card flex flex-col md:flex-row bg-base-100 shadow-xl border border-slate-50 h-full md:max-h-96 overflow-hidden w-full max-w-md md:max-w-2xl animate-scaleUp">
          <h2 className="mt-6 text-center font-semibold text-2xl text-slate-50 md:hidden">
            Your Profile
          </h2>
          <div className="relative flex items-center justify-center mt-4 md:mt-0 group overflow-hidden rounded-full md:rounded-none w-full max-w-32 h-32 md:h-auto md:max-w-xs self-center">
            <img
              src="https://i.pinimg.com/736x/79/91/14/799114671e44914759d41f8dc1fa16f8.jpg"
              alt="Photo Profile"
              className="object-cover"
            />
            <input type="file" name="image" id="image" hidden />
            <label
              htmlFor="image"
              className="absolute w-full h-full bg-neutral-800 bg-opacity-60 flex items-center justify-center z-10 top-0 cursor-pointer opacity-0 transition-all duration-500 group-hover:opacity-100"
            >
              <ImageUp color="#794CEB" className="size-9 md:size-16" />
            </label>
          </div>
          <div className="card-body p-6 pb-5">
            <h2 className="mt-2 mb-2 text-center font-semibold text-2xl text-slate-50 hidden md:block">
              Your Profile
            </h2>
            <form id="updateProfile" className="flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="w-full max-w-md"
                  placeholder="Custom Id"
                />
                <IdCard />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="w-full max-w-md"
                  placeholder="Email"
                />
                <Mail />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="w-full max-w-md"
                  placeholder="Fullname"
                />
                <UserRound />
              </label>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
            <p className="mt-5">Since: 16 Nov 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
