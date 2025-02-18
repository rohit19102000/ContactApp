import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Contacts = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
     
      <Sidebar />

      <div className="flex-1 p-4">
        <Dashboard />
      </div>
    </div>
  );
};

export default Contacts;
