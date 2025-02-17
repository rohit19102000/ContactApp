import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";


const apiUrl = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,


  signup: async (name, email, password) => {
    try {
      const signupResponse = await axiosInstance.post("/auth/signup", { name, email, password });

      if (signupResponse.status === 201) {
        const loginResponse = await axiosInstance.post("/auth/login", { email, password });

        set({ user: loginResponse.data.user, token: loginResponse.data.token });

        localStorage.setItem("token", loginResponse.data.token);

        return true; 
      }
      return false; 
    } catch (error) {
      console.error("Signup and login error:", error.response?.data?.message || error.message);
      return false; 
    }
  },
  
  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("token", res.data.token);
      return true;
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return false;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
  },


}));
