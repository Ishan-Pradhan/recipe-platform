import multer from "multer";
import path from "path";

//cb = callback

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use absolute path to the 'public/temp' directory
    const tempDir = path.join(__dirname, "public", "temp");
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
