import { create } from "zustand";
import toast from "react-hot-toast";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("contactapp-theme") || "coffee",

  setTheme: (theme) => {
    localStorage.setItem("contactapp-theme", theme);
    set({ theme });
    document.documentElement.setAttribute("data-theme", theme); 

    toast.success(`Theme changed to ${theme}!`); // Show success toast
  },
}));
