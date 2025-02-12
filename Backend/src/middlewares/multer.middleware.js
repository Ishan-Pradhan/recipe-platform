import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Multer in-memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image buffer to Cloudinary using a stream
export const uploadOnCloudinary = async (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: fileName, // Set a custom file name
        secure: true,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream); // Send buffer to Cloudinary
  });
};
