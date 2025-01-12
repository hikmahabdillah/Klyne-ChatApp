import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="box flex items-center gap-3 border border-red-50 w-full max-w-md md:max-w-4xl py-6 md:p-3 rounded-3xl max-h-[630px] md:h-full">
        <div className="hidden box-1 h-[585px] w-full max-w-sm bg-gradient-to-b from-[#ddd] via-[#794CEB] to-[#FF00E5] rounded-xl md:flex md:items-center">
          <img src="./public/Signin-Illustration.svg" alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 px-5"
        >
          <div className="header">
            <div className="logo flex items-center gap-3">
              <img src="./public/Main Logo.svg" alt="Logo Klyne" width="65px" />
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Login Account
              </h1>
            </div>
            <div className="greetings ml-4">
              <p>Get started with your account</p>
            </div>
          </div>
        <div className="form-control">
          <InputForm formData={formData} setFormData={setFormData} name="email" text="Email" type="email"/>
          <InputForm formData={formData} setFormData={setFormData} name="password" text="Password" type="password"/>
        </div>
          <button className="btn btn-primary w-full">Login</button>
          <p className="text-center">
          Already have an account?  
            <Link to="/signup" className="text-[#794CEB] font-semibold text-underline"> Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage