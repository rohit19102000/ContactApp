import express from "express";
import { createContact, getAllContacts, getContactById, updateContact, deleteContact } from "../controllers/contacts.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Create Contact
router.post("/create", verifyToken, createContact);

// Fetch all contacts for logged-in user
router.get("/", verifyToken, getAllContacts);

// Fetch single contact by ID
router.get("/:id", verifyToken, getContactById);

// Update contact by ID
router.put("/:id", verifyToken, updateContact);

// Delete contact by ID
router.delete("/:id", verifyToken, deleteContact);

export default router;
