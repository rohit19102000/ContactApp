import React from "react";
import ContactCardButton from "./ContactCardButton";

const ContactCard = ({ contact, setContactToEdit, setEditModalOpen, deleteContact, selectedDataFields }) => {
  return (
    <div key={contact._id} className="card card-bordered bg-base-100 shadow-md p-6 md:p-4 rounded-lg mb-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">


        {/* Left Section - Contact Data */}
        <div className="flex-1 space-y-8">
          <h3 className="text-lg font-semibold">{contact.name}</h3>
          {selectedDataFields.includes("number") && <p ><strong>Number:</strong> {contact.number}</p>}
          {selectedDataFields.includes("email") && <p ><strong>Email:</strong> {contact.email}</p>}
          {selectedDataFields.includes("socials") && contact.socials &&    Array.isArray(contact.socials) && 
           contact.socials.filter(social => social.trim() !== "").length > 0 && (  <p><strong>Socials:</strong> {contact.socials.join(", ")}</p>)}
          {selectedDataFields.includes("createdAt") && <p ><strong>Created At:</strong> {new Date(contact.createdAt).toLocaleString()}</p>}
        </div>

        {/* Right Section - Buttons */}
        
        <div className="flex flex-row justify-start gap-3 mt-4 md:flex-col md:items-end md:gap-2 md:mt-0">
        <ContactCardButton 
            onClick={() => { setContactToEdit(contact); setEditModalOpen(true); }} 
            icon="✏️" 
            ariaLabel="Edit Contact"
          />
          <ContactCardButton 
            onClick={() => deleteContact(contact._id)} 
            icon="🗑️" 
            ariaLabel="Delete Contact"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
