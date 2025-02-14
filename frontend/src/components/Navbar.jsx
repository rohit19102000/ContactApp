import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-base-200 p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">ContactsApp</div>

      <div className="flex gap-4">
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
    </nav>
  );
};

export default Navbar;
