import express from "express";

import {
  registerUser,
  loginUser,
  resetPassword,
  updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ======================================
// Test Route
// ======================================
router.get("/hello", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth Routes Working Successfully ✅",
  });
});

// ======================================
// Register
// ======================================
router.post("/register", registerUser);

// ======================================
// Login
// ======================================
router.post("/login", loginUser);

// ======================================
// Reset Password
// ======================================
router.post("/reset-password", resetPassword);

// ======================================
// Update Profile
// ======================================
router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);

export default router;