// src/middlewares/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Configure where and how to save the image
const storage = multer.memoryStorage();

export const upload = multer({ storage });