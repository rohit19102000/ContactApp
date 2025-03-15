import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";

const apiUrl =  import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL :"/"

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, 
  token: localStorage.getItem("token") || null,

  signup: async (name, email, password) => {
    try {
      const signupResponse = await axiosInstance.post("/auth/signup", { name, email, password });

      if (signupResponse.status === 201) {
        const loginResponse = await axiosInstance.post("/auth/login", { email, password });

        set({ user: loginResponse.data.user, token: loginResponse.data.token });

        localStorage.setItem("token", loginResponse.data.token);
        localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

        toast.success("Signup successful! Logged in.");
        return true;
      }

      toast.error("Signup failed. Please try again.");
      return false;
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
      console.error("Signup and login error:", error.response?.data?.message || error.message);
      return false;
    }
  },

  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });

      set({ user: res.data.user, token: res.data.token });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
      console.error("Login error:", error.response?.data?.message || error.message);
      return false;
    }
  },

  logout: () => {
    set({ user: null, token: null });

    localStorage.removeItem("token");
    localStorage.removeItem("user"); 

    toast.success("Logout successful!");
  },
}));
