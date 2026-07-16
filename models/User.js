import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ===============================
    // Basic Information
    // ===============================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // ===============================
    // Profile Information
    // ===============================
    bio: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    university: {
      type: String,
      default: "",
    },

    semester: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // ===============================
    // Skills
    // ===============================
    skills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;