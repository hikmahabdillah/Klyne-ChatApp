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
    
  },
  signUp: async(data) => {
    try{
      const res = await axiosInstance.post("/auth/signup", data);
      toast.success("account create Successfully")

      set({authUser: res.data});
    }catch(err){
      console.log("error", err)
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    }finally{
      set({isSigningUp: false});
    }
  }
}));