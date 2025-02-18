import { useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore.js";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const { selectedCategory, selectedFilter, selectedDataFields } = useAppStore();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axiosInstance.get("/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts
    .filter((contact) => selectedCategory === "All" || contact.category === selectedCategory)
    .sort((a, b) => {
      if (selectedFilter === "A-Z") return a.name.localeCompare(b.name);
      if (selectedFilter === "Z-A") return b.name.localeCompare(a.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="flex flex-col space-y-4 p-4">
      {filteredContacts.map((contact) => (
        <div key={contact._id} className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body space-y-2">

            {selectedDataFields.includes("name") && <h3 className="text-xl font-semibold">{contact.name}</h3>}
            {selectedDataFields.includes("number") && <p><strong>Number:</strong> {contact.number}</p>}
            {selectedDataFields.includes("email") && <p><strong>Email:</strong> {contact.email}</p>}
            {selectedDataFields.includes("socials") && <p><strong>Socials:</strong> {contact.socials.join(", ")}</p>}
            {selectedDataFields.includes("createdAt") && <p><strong>Created At:</strong> {new Date(contact.createdAt).toLocaleString()}</p>}
          
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
