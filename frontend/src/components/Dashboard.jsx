import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore.js";
import axiosInstance from "../utils/axiosInstance";
import CreateContactModal from "../Modals/CreateContactModal";
import EditContactModal from "../Modals/EditContactModal"; 

const Dashboard = () => {
  const { selectedCategory, selectedFilter, selectedDataFields } = useAppStore();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axiosInstance.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts
    .filter((contact) =>
      (selectedCategory === "All" || contact.category === selectedCategory) &&
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
    .sort((a, b) => {
      if (selectedFilter === "A-Z") return a.name.localeCompare(b.name);
      if (selectedFilter === "Z-A") return b.name.localeCompare(a.name);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full"
      />

      {/* Create Contact Button */}
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>➕ Create New Contact</button>

      {/* Contacts List */}
      {filteredContacts.map((contact) => (
     <div key={contact._id} className="card card-bordered bg-base-100 shadow-md p-6 md:p-4 rounded-lg mb-4">
     <div className="flex flex-col md:flex-row md:justify-between gap-4">
       {/* Left Section - Contact Data */}
       <div className="flex-1 space-y-2">
         <h3 className="text-lg font-semibold">{contact.name}</h3>
         {selectedDataFields.includes("number") && <p><strong>Number:</strong> {contact.number}</p>}
         {selectedDataFields.includes("email") && <p><strong>Email:</strong> {contact.email}</p>}
         {selectedDataFields.includes("socials") && <p><strong>Socials:</strong> {contact.socials.join(", ")}</p>}
         {selectedDataFields.includes("createdAt") && <p><strong>Created At:</strong> {new Date(contact.createdAt).toLocaleString()}</p>}
       </div>
   
       {/* Right Section - Buttons */}
       <div className="flex flex-row justify-start gap-3 mt-4 md:flex-col md:items-end md:gap-2 md:mt-0">
          <button className="btn btn-sm " onClick={() => { setContactToEdit(contact); setEditModalOpen(true); }}>✏️</button>
          <button className="btn btn-sm " onClick={() => deleteContact(contact._id)}>🗑️ </button>
       </div>
     </div>
   </div>
   
    
      ))}

      {/* No contacts found message */}
      {filteredContacts.length === 0 && (
        <p className="text-center text-gray-500">No contacts found.</p>
      )}

      {/* Create Contact Modal */}
      {isModalOpen && <CreateContactModal onClose={() => setModalOpen(false)} onContactAdded={fetchContacts} />}

      {/* Edit Contact Modal */}
      {isEditModalOpen && <EditContactModal contact={contactToEdit} onClose={() => setEditModalOpen(false)} onContactUpdated={fetchContacts} />}
    </div>
  );
};

export default Dashboard;
