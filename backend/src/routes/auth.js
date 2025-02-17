import express from "express";
import { signup, login, logout, getProfile } from "../controllers/auth.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Define routes using controllers
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);

export default router;
