import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// ===============================
// Cloudinary Storage
// ===============================
const storage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "DevTask/ProfileImages",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ],

    public_id: `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}`,
  }),
});

// ===============================
// File Filter
// ===============================
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only image files are allowed"), false);

  }

};

// ===============================
// Multer Upload
// ===============================
const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

});

export default upload;