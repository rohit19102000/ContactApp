import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Contacts = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - Fixed Width */}
      <div className="w-64 bg-base-200 p-4 hidden md:block">
        <Sidebar />
      </div>

      {/* Dashboard - Takes Remaining Space */}
      <div className="flex-1 p-4">
        <Dashboard />
      </div>
    </div>
  );
};

export default Contacts;
