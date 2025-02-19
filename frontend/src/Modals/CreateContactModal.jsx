import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const CreateContactModal = ({ onClose, onContactAdded }) => {
  const [contact, setContact] = useState({
    name: "",
    number: "",
    email: "",
    socials: "",
    category: "Family",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axiosInstance.post("/contacts/create", contact);
      onContactAdded(); 
      onClose();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-primary">Create Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="text" name="number" placeholder="Number" className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="input input-bordered input-primary w-full" onChange={handleChange} required />
          <input type="text" name="socials" placeholder="Social Links (comma separated)" className="input input-bordered input-primary w-full" onChange={handleChange} />
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="category" className="select select-bordered select-primary w-full" onChange={handleChange}>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Close Friends">Close Friends</option>
              <option value="Work">Work</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">Save Contact</button>
        </form>
        <button onClick={onClose} className="btn btn-ghost w-full mt-2">Cancel</button>
      </div>
    </div>
  );
};

export default CreateContactModal;
