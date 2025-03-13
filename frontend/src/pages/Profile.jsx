
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Redirect to login if no user is found
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

 
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-base-200">
      {/* User Info */}
      <h1 className="text-3xl font-bold text-primary mb-2 text-center">
        Hello, {user?.name} 👋
      </h1>
      <p className="text-gray-500 text-lg mb-6 text-center">
        You are currently logged in as <span className="font-semibold">{user?.email}</span>
      </p>

      {/* Logout Section */}
      <div className="card w-96 bg-base-100 shadow-xl p-6 text-center">
        <p className="text-lg mb-3">Want to log out?</p>
        <button className="btn btn-error w-full" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
