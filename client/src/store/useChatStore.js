import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set) => ({
  messages: [],
  selectedUser: null,
  isMessagesLoading: true,

  getMessages: async(userId) => {
    set({isMessagesLoading: true});
    try{
      const res = await axiosInstance.get(`/message/${userId}`);
      set({messages: res.data});
    }catch(err){
      toast.error(err.response.data.message);
    }finally{
      set({isMessagesLoading: false});
    }
  },
  // 
  setSelectedUser: (user) => set({selectedUser: user}),
}))