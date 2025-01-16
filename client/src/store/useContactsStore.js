import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const useContactsStore = create((set) => ({
  contacts: [],
  isLoading: true,

  listContact: async() => {
    try {
      const res = await axiosInstance.get("/contacts")

      set({contacts: res.data});
    } catch (err) {
      console.log("Error in check auth: ",err)
      set({contacts:null});
    }finally{
      set({isLoading: true})
    }
  }
}));