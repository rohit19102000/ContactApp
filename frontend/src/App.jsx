import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Contacts from "./pages/Contacts.jsx";
import About from "./pages/About.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

import { useThemeStore } from "./store/useThemeStore"
import {THEMES} from './constants/index'




function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col" data-theme="dark">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Contacts />} />
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