import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-base-200 p-4 flex justify-between items-center shadow-md">
      {/* Logo - Clickable to go Home */}
      <Link to="/" className="text-xl font-bold">
        ContactsApp
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-300"
            }`
          }
        >
          Contacts
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-300"
            }`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-300"
            }`
          }
        >
          Settings
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `px-3 py-2 rounded-lg transition ${
              isActive ? "bg-primary text-white" : "hover:bg-base-300"
            }`
          }
        >
          Profile
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-4 bg-base-100 shadow-lg rounded-lg p-4 flex flex-col gap-2 w-48 md:hidden">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary text-white" : "hover:bg-base-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Contacts
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary text-white" : "hover:bg-base-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary text-white" : "hover:bg-base-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Settings
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition ${
                isActive ? "bg-primary text-white" : "hover:bg-base-300"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
