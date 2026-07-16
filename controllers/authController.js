import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================================
// Register User
// ======================================
export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Login User
// ======================================
export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Reset Password
// ======================================
export const resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    if (!email || !newPassword) {

      return res.status(400).json({
        success: false,
        message: "Email and New Password are required",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// Update Profile
// ======================================
export const updateProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user._id);

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || "";
    user.bio = req.body.bio || "";
    user.university = req.body.university || "";
    user.semester = req.body.semester || "";
    user.location = req.body.location || "";
    user.github = req.body.github || "";
    user.linkedin = req.body.linkedin || "";

    // Skills (Future Ready)

    if (req.body.skills) {

      user.skills = JSON.parse(req.body.skills);

    }

    // Profile Image Upload

    if (req.file) {

      user.profileImage =
        `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};