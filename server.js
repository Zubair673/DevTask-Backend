import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// ===============================
// Load Environment Variables
// ===============================
dotenv.config();

// ===============================
// Connect MongoDB
// ===============================
connectDB();

// ===============================
// Initialize App
// ===============================
const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ===============================
// Static Uploads Folder
// ===============================
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

// ===============================
// Debug Middleware
// ===============================
app.use((req, res, next) => {

  console.log(`${req.method} ${req.originalUrl}`);

  next();

});

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Welcome to DevTask Backend API 🚀",

  });

});

// ===============================
// Test Route
// ===============================
app.get("/api/test", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Backend is working successfully!",

  });

});

// ===============================
// Auth Test Route
// ===============================
app.get("/api/auth/hello", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Auth Route Working Successfully ✅",

  });

});

// ===============================
// API Routes
// ===============================
app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

// ===============================
// 404 Handler
// ===============================
app.use((req, res) => {

  res.status(404).json({

    success: false,

    message: `Route Not Found: ${req.originalUrl}`,

  });

});

// ===============================
// Global Error Handler
// ===============================
app.use((err, req, res, next) => {

  console.error(err);

  res.status(err.status || 500).json({

    success: false,

    message: err.message || "Internal Server Error",

  });

});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("====================================");

  console.log(`🚀 Server running on http://localhost:${PORT}`);

  console.log("====================================");

});