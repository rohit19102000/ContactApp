import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const EditContactModal = ({ contact, onClose, onContactUpdated }) => {
  const [updatedContact, setUpdatedContact] = useState({ ...contact });

  const handleChange = (e) => {
    setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/contacts/${contact._id}`, updatedContact);
      onContactUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-primary">Edit Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" value={updatedContact.name} className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="text" name="number" value={updatedContact.number} className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="email" name="email" value={updatedContact.email} className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="text" name="socials" value={updatedContact.socials} className="input input-bordered input-primary w-full" onChange={handleChange} />

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="category" className="select select-bordered select-primary w-full" value={updatedContact.category} onChange={handleChange}>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Close Friends">Close Friends</option>
              <option value="Work">Work</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">Update Contact</button>
        </form>
        <button onClick={onClose} className="btn btn-ghost w-full mt-2">Cancel</button>
      </div>
    </div>
  );
};

export default EditContactModal;
