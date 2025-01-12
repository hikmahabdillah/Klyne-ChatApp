import {create} from "zustand";
import {axiosInstance} from "../lib/axios";

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
    
  }
}));