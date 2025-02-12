import multer from "multer";

//cb = callback

import { fileURLToPath } from "url";
import path from "path";

// Get the current directory of the module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute path for the 'public/temp' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Make sure you're referencing the correct path from the root of your project
    const tempDir = path.join(__dirname, "../../public", "temp"); // Adjust path to the root of the project
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
});
