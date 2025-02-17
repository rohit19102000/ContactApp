import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore.js";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { selectedCategory, selectedFilter } = useAppStore();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/contacts");
        console.log("Fetched Contacts: " ,response.data)
  
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts
    .filter((contact) => {
      if (selectedCategory === "All") return true;
      return contact.category === selectedCategory;
    })
    .sort((a, b) => {
      if (selectedFilter === "A-Z") {
        return a.name.localeCompare(b.name);
      }
      if (selectedFilter === "Z-A") {
        return b.name.localeCompare(a.name);
      }
      return new Date(b.createdAt) - new Date(a.createdAt); 
    }
  
  );



  return (
    <div className="flex flex-col space-y-4 p-4">
      {filteredContacts.map((contact) => (
        <div
          key={contact._id}
          className="card card-bordered bg-base-100 shadow-md"
        >
          <div className="card-body">
            <h3 className="text-xl font-semibold">{contact.name}</h3>
            <p>{contact.number}</p>
            <p>{contact.email}</p>
            <p>{contact.createdAt}</p>
            <p>{contact.socials}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
