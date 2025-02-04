import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useContactsStore = create((set) => ({
  contacts: [],
  detail: null,
  users: [],
  isLoading: true,

  detailContact: async (id) => {
    try {
      const res = await axiosInstance.get(`/contacts/detail-contact/${id}`);

      set({ detail: res.data });
    } catch (err) {
      console.log("Error in list contact: ", err);
      set({ detail: null });
    }
  },

  contactList: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/contacts");

      set({ contacts: res.data });
    } catch (err) {
      console.log("Error in list contact: ", err);
      set({ contacts: null });
    } finally {
      set({ isLoading: false });
    }
  },
  userList: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/contacts/list-user");

      set({ users: res.data });
    } catch (err) {
      console.log("Error in list contact: ", err);
      set({ contacts: null });
    } finally {
      set({ isLoading: false });
    }
  },
  searchUser: async (searchTerm) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(
        `contacts/search-user?searchId=${searchTerm}`
      );

      set({ users: res.data });
    } catch (err) {
      console.log("Error in searchContact: ", err);
      set({ users: null });
    } finally {
      set({ isLoading: false });
    }
  },
  searchContact: async (searchTerm) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(
        `contacts/search-contact?contactName=${searchTerm}`
      );

      set({ contacts: res.data });
    } catch (err) {
      console.log("Error in searchContact: ", err);
      set({ contacts: null });
    } finally {
      set({ isLoading: false });
    }
  },
  saveContact: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("contacts/save-contact", data);
      toast.success("Save contact successfully");

      set((state) => ({
        contacts: [...state.contacts, res.data.newContact],
      }));
    } catch (err) {
      console.log("error", err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  deleteContact: async (id) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`contacts/delete-contact/${id}`);
      toast.success("Delete contact successfully");

      set((state) => ({
        contacts: state.contacts.filter((contact) => contact.contactId !== id),
      }));
    } catch (err) {
      console.log("error", err);
      const errorMessage =
        err.response?.data?.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
