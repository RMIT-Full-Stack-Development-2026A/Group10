// src/middlewares/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Configure where and how to save the image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

export const upload = multer({ storage });