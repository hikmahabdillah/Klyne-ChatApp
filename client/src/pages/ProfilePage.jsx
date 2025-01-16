import { IdCard, ImageUp, Mail, UserRound, Loader2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

// Komponen PhotoProfile
const PhotoProfile = ({ imagePreview, isUpdateProfile, handleUpdatePhoto }) => {
  return (
    <div className="relative flex items-center justify-center mt-4 md:mt-0 group overflow-hidden rounded-full md:rounded-none w-full max-w-32 h-32 md:h-auto md:max-w-xs self-center">
      <img
        src={imagePreview}
        alt="Photo Profile"
        className="object-cover"
        id="photoProfile"
      />
      <input
        type="file"
        name="profilePic"
        id="profilePic"
        onChange={handleUpdatePhoto}
        accept="image/*"
        hidden
        disabled={isUpdateProfile}
      />
      <label
        htmlFor="profilePic"
        className="absolute w-full h-full bg-neutral-800 bg-opacity-60 flex items-center justify-center z-10 top-0 cursor-pointer opacity-0 transition-all duration-500 group-hover:opacity-100"
      >
        <ImageUp color="#794CEB" className="size-9 md:size-16" />
      </label>
    </div>
  );
};

// Komponen InputFormWithIcon
const InputFormWithIcon = ({ formData, setFormData, name, text, Icon }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="w-full max-w-md"
        placeholder={text}
        name={name}
        value={formData[name] || ""}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      />
      <Icon />
    </label>
  );
};

// Komponen Utama
const ProfilePage = () => {
  const { authUser, isUpdateProfile, updateProfile, updatePhotoProfile } = useAuthStore();
  const user = authUser;

  const [formData, setFormData] = useState({
    customId: user.customId,
    email: user.email,
    fullName: user.fullName,
  });

  const accountCreatedAt = new Date(user.createdAt).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [imagePreview, setImagePreview] = useState(user.profilePic || "/Avatar.svg");

  const handleUpdatePhoto = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setImagePreview(base64Image);
        await updatePhotoProfile({ profilePic: base64Image });
      };
    } else {
      setImagePreview(null);
    }
  };

  const validateForm = () => {
    if (!formData.customId.trim()) return alert("Custom Id is required!");
    if (!formData.fullName.trim()) return alert("Full Name is required!");
    if (!formData.email.trim()) return alert("Email is required!");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return alert("Invalid email format");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      updateProfile(formData);
    }
  };

  return (
    <div className="h-screen flex items-center">
      <Sidebar />
      <div className="w-full flex items-center justify-center p-2 md:p-6">
        <div className="card flex flex-col md:flex-row bg-base-100 shadow-xl border border-slate-50 h-full md:max-h-96 overflow-hidden w-full max-w-md md:max-w-2xl animate-scaleUp">
          <h2 className="mt-6 text-center font-semibold text-2xl text-slate-50 md:hidden">
            Your Profile
          </h2>
          <PhotoProfile
            imagePreview={imagePreview}
            isUpdateProfile={isUpdateProfile}
            handleUpdatePhoto={handleUpdatePhoto}
          />
          <div className="card-body p-6 pb-5">
            <h2 className="mt-2 mb-2 text-center font-semibold text-2xl text-slate-50 hidden md:block">
              Your Profile
            </h2>
            <form id="updateProfile" onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputFormWithIcon
                formData={formData}
                setFormData={setFormData}
                name="customId"
                text="Custom Id"
                Icon={IdCard}
              />
              <InputFormWithIcon
                formData={formData}
                setFormData={setFormData}
                name="email"
                text="Email"
                Icon={Mail}
              />
              <InputFormWithIcon
                formData={formData}
                setFormData={setFormData}
                name="fullName"
                text="Fullname"
                Icon={UserRound}
              />
              <button type="submit" className="btn btn-primary" disabled={isUpdateProfile}>
                {isUpdateProfile ? <Loader2 className="animate-spin" /> : "Save Changes"}
              </button>
            </form>
            <p className="mt-5">Since: {accountCreatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
