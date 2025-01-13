import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=> ({
  authUser: null,
  isSigningUp: false,
  isLogin: false,
  isUpdateProfile: false,
  isCheckingAuth: true,

  // actions
  checkAuth: async() => {
    try{
      const res = await axiosInstance.get("/auth/check");

      set({authUser:res.data});
    }catch(err){
      console.log("Error in check auth: ",err)
      set({authUser:null});
    }finally{
      set({isCheckingAuth: false});
    }
  },
  login: async(data) => {
    set({isLogin: true});
    try{
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Login successfully")

      set({authUser: res.data});
    }catch(err){
      console.log("error", err)
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }finally{
      set({isLogin: false});
    }
  },
  signUp: async(data) => {
    set({isSigningUp: true});
    try{
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("Account create successfully")

      set({authUser: res.data});
    }catch(err){
      console.log("error", err)
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }finally{
      set({isSigningUp: false});
    }
  },
  logout: async() => {
    try{
      const res = await axiosInstance.post("/auth/logout");
      toast.success(res.data.message);

      set({authUser: null});
    }catch(err){
      console.log("error", err)
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }finally{
      set({isCheckingAuth: false});
    }
  }
}));