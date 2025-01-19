import {create} from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

export const useContactsStore = create((set) => ({
  contacts: [],
  users: [],
  isLoading: true,

  contactList: async() => {
    set({isLoading: true})
    try {
      const res = await axiosInstance.get("/contacts")

      set({contacts: res.data});
    } catch (err) {
      console.log("Error in list contact: ",err)
      set({contacts:null});
    }finally{
      set({isLoading: false})
    }
  },
  userList: async() => {
    set({isLoading: true})
    try {
      const res = await axiosInstance.get("/contacts/list-user")

      set({users: res.data});
    } catch (err) {
      console.log("Error in list contact: ",err)
      set({contacts:null});
    }finally{
      set({isLoading: false})
    }
  },
  searchUser: async(searchTerm) => {
    set({isLoading: true})
    try{
      const res = await axiosInstance.get(`contacts/search-user?searchId=${searchTerm}`);

      set({users: res.data});
    }catch(err){
      console.log("Error in searchContact: ",err)
      set({users:null});
    }finally{
      set({isLoading: false})
    }
  },
  searchContact: async(searchTerm) => {
    set({isLoading: true})
    try{
      console.log("contactcontact name : ", searchTerm)
      const res = await axiosInstance.get(`contacts/search-contact?contactName=${searchTerm}`);

      set({contacts: res.data});
    }catch(err){
      console.log("Error in searchContact: ",err)
      set({contacts:null});
    }finally{
      set({isLoading: false})
    }
  }
}));