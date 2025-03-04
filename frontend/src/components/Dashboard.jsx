import { useAppStore } from "../store/useAppStore.js";
import axiosInstance from "../utils/axiosInstance";
import CreateContactModal from "../Modals/CreateContactModal";
import EditContactModal from "../Modals/EditContactModal";
import ContactCard from "./ContactCard.jsx";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const { selectedCategory, selectedFilter, selectedDataFields } = useAppStore();
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [isFetchingContacts, setIsFetchingContacts] = useState(false);

  const cardsRef = useRef([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { x: window.innerWidth, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [contacts]);

  const fetchContacts = async () => {
    setIsFetchingContacts(true);
    try {
      const response = await axiosInstance.get("/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to fetch contacts.");
    } finally {
      setIsFetchingContacts(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      await axiosInstance.delete(`/contacts/${id}`);
      toast.success(`Contact "${id}" deleted successfully!`);
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact.");
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
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="input input-bordered w-full"
      />

      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        ➕ Create New Contact
      </button>

      {isFetchingContacts ? (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          <p>Loading...</p>
        </div>
      ) : filteredContacts.length > 0 ? (
        filteredContacts.map((contact, index) => (
          <div
            key={contact._id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <ContactCard
              contact={contact}
              setContactToEdit={setContactToEdit}
              setEditModalOpen={setEditModalOpen}
              deleteContact={deleteContact}
              selectedDataFields={selectedDataFields}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No contacts found.</p>
      )}

      {isModalOpen && <CreateContactModal onClose={() => setModalOpen(false)} onContactAdded={fetchContacts} />}
      {isEditModalOpen && <EditContactModal contact={contactToEdit} onClose={() => setEditModalOpen(false)} onContactUpdated={fetchContacts} />}
    </div>
  );
};

export default Dashboard;
