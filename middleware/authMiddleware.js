import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {

  try {

    const authHeader = req.header("Authorization");

    if (!authHeader) {

      return res.status(401).json({
        success: false,
        message: "Access Denied. No Token Provided.",
      });

    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    }

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }

};

export default authMiddleware;