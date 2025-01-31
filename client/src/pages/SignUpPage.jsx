import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    customId: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.customId.trim()) return toast.error("CustomId is required!")
    if(formData.customId.trim().length < 3) return toast.error("CustomId is too short!")
    if(!formData.fullName.trim()) return toast.error("Full name is required!")
    if(!formData.password.trim()) return toast.error("Password is required!")
    if(formData.password.trim().length < 6) return toast.error("Password must be at least 6 characters!")
    if(!formData.email.trim()) return toast.error("Email is required!")
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if(success) signUp(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="box flex items-center gap-3 border w-full max-w-md md:max-w-4xl py-6 md:p-3 rounded-3xl max-h-[630px] md:h-full">
        {/* leftSide */}
        <div className="hidden h-[585px] w-full max-w-sm bg-gradient-size animate-gradient duration-300 bg-gradient-to-t from-[#ddd] via-[#794CEB] to-[#FF00E5] rounded-xl md:flex md:items-center">
          <img src="./Signup-Illustration.svg" className="animate-float" alt="" />
        </div>
        {/* rightSide */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 px-5"
        >
          <div className="header">
            <div className="logo flex items-center gap-3">
              <img src="./Main Logo.svg" alt="Logo Klyne" width="65px" />
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Create Account
              </h1>
            </div>
            <div className="greetings ml-4">
              <p>Get started with your account</p>
            </div>
          </div>
          <InputForm formData={formData} setFormData={setFormData} name="customId" text="Custom Id" type="text"/>
        <div className="form-control">
          <InputForm formData={formData} setFormData={setFormData} name="fullName" text="Full Name" type="text"/>
          <InputForm formData={formData} setFormData={setFormData} name="email" text="Email" type="email"/>
          <InputForm formData={formData} setFormData={setFormData} name="password" text="Password" type="password"/>
        </div>
          <button className="btn btn-primary w-full" disabled={isSigningUp}>{isSigningUp ? <Loader2 className="animate-spin"/> : "Register"}</button>
          <p className="text-center">
          Don't have an account?  
            <Link to="/login" className="text-[#794CEB] font-semibold text-underline"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
