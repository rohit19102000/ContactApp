
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance"; // Use your axios instance
import toast from "react-hot-toast";

export const useThemeStore = create((set) => ({
  theme: "dark",

  setTheme: async (theme) => {
    try {
      const response = await axiosInstance.put("/auth/theme", { theme });

      if (response?.status === 200 && response?.data?.theme) {
        set({ theme: response.data.theme });
        toast.success("Theme updated successfully!");
      } else {
        console.error("Unexpected response status or data:", response);
        toast.error("Failed to update theme. Unexpected response.");
      }
    } catch (error) {
      console.error("Failed to update theme:", error.response?.data || error.message);
      toast.error("Failed to update theme. Please try again.");
    }
  },

  fetchTheme: async () => {
    try {
      const response = await axiosInstance.get("/auth/theme");
      if (response?.status === 200 && response?.data?.theme) {
        set({ theme: response.data.theme });
        toast.success("Theme fetched successfully!");
      } else {
        console.error("Unexpected response status or data:", response);
        toast.error("Failed to fetch theme. Unexpected response.");
      }
    } catch (error) {
      console.error("Failed to fetch theme:", error.response?.data || error.message);
      toast.error("Failed to fetch theme. Please try again.");
    }
  },
}));
