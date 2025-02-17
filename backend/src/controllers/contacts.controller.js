import Contact from "../models/Contact.js";

// Create Contact
export const createContact = async (req, res) => {
  try {
    const { name, number, email, socials, category } = req.body;
    const ownerId = req.user.userId;

    if (!ownerId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newContact = new Contact({ name, number, email, socials, category, ownerId });
    await newContact.save();

    res.status(201).json({ message: "Contact created successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ error: "Error creating contact", details: error.message });
  }
};

// Fetch all contacts for logged-in user
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contacts", details: error.message });
  }
};

// Fetch single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, ownerId: req.user.userId });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact" });
  }
};

// Update contact by ID
export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.userId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    res.status(500).json({ error: "Error updating contact" });
  }
};

// Delete contact by ID
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
};
