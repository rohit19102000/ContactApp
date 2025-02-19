import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthStore } from  "./store/useAuthStore.js"
import Navbar from "./components/Navbar.jsx";
import Contacts from "./pages/Contacts.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

import { useThemeStore } from "./store/useThemeStore"
import {THEMES} from './constants/index'
import { useAuthStore } from "./store/useAuthStore.js";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "react-hot-toast";




function App() {

  const {theme} = useThemeStore();
  const { token } = useAuthStore();


  return (
    <Router>
    <Toaster position="top-center" />
      <div className="min-h-screen flex flex-col" data-theme={theme}>
        <Navbar />
        <div className="p-4">
          <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={token ? <Contacts /> : <Navigate to="/login" />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;