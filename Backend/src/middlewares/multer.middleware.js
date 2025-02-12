import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Multer in-memory storage configuration
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // Limit file size to 25 MB
});

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload the image to Cloudinary
const uploadOnCloudinary = async (fileBuffer, fileName) => {
  try {
    if (!fileBuffer) return null;

    // Upload the file to Cloudinary using in-memory buffer
    const response = await cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        public_id: fileName, // Optionally, set a custom public ID
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed", error);
          return null;
        }
        return result;
      }
    );

    // Stream the file buffer into Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error(error);
        }
        return result;
      }
    );

    stream.end(fileBuffer); // Send file buffer to Cloudinary
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary };
