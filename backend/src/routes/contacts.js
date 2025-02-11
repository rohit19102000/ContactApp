import express from "express";
import Contact from "../models/Contact.js";
import verifyToken from "../middleware/verifyToken.js"; 

const router = express.Router();

// Create Contact
router.post("/create", verifyToken, async (req, res) => {
    try {
      const { name, number, email, socials, category } = req.body;
      const ownerId = req.user.userId; // Make sure this is `userId`

      if (!ownerId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const newContact = new Contact({ name, number, email, socials, category, ownerId });
      await newContact.save();

      res.status(201).json({ message: "Contact created successfully", contact: newContact });
    } catch (error) {
      res.status(500).json({ error: "Error creating contact", details: error.message });
    }
});



// Fetch all contacts for logged-in user
router.get("/", verifyToken, async (req, res) => {
    try {
      console.log("User ID from token:", req.user.userId); // Debugging log
  
      const contacts = await Contact.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
      console.log("Fetched contacts:", contacts); // Debugging log
  
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Error fetching contacts", details: error.message });
    }
  });


// Fetch single contact by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, ownerId: req.user.id });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contact" });
  }
});

// Update contact by ID
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
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
});

// Delete contact by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id,
    });

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting contact" });
  }
});

export default router;
