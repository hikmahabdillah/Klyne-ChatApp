import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  chatList: [],
  selectedUser: null,
  isMessagesLoading: true,
  isLoading: true,

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  getChatList: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/message/chat");
      set({ chatList: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  sendMessage: async (userId, data) => {
    try {
      const res = await axiosInstance.post(`/message/send/${userId}`, data);

      set((state) => ({
        messages: [...state.messages, res.data],
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  },
  listenNewMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (data) => {
      const isMessageSentFromSelectedUser =
        data.senderId === selectedUser.contactRef;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, data],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
