import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-base-200 shadow-md p-4 flex justify-between">
      {/* Left Side - Contacts */}
      <div>
        <Link to="/" className="btn btn-ghost text-lg">Contacts</Link>
      </div>

      {/* Right Side - Other Links */}
      <div className="flex gap-4">
        <Link to="/about" className="btn btn-ghost">About</Link>
        <Link to="/settings" className="btn btn-ghost">Settings</Link>
        <Link to="/profile" className="btn btn-ghost">Profile</Link>
      </div>
    </nav>
  );
}
