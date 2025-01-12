import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    customId: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="box flex items-center gap-3 border border-red-50 w-full max-w-md md:max-w-4xl py-6 md:p-3 rounded-3xl max-h-[630px] md:h-full">
        <div className="hidden box-1 h-[585px] w-full max-w-sm bg-gradient-to-t from-[#ddd] via-[#794CEB] to-[#FF00E5] rounded-xl md:flex md:items-center">
          <img src="./public/Signup-Illustration.svg" alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 px-5"
        >
          <div className="header">
            <div className="logo flex items-center gap-3">
              <img src="./public/Main Logo.svg" alt="Logo Klyne" width="65px" />
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
          <button className="btn btn-primary w-full">Register</button>
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
