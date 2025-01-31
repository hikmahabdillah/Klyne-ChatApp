import {create} from "zustand";

export const useThemesStore = create((set) => ({
  theme: localStorage.getItem("chatTheme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("chatTheme", theme);
    set({theme});
  }

}))