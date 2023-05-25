import multer from "multer";
import sharp from "sharp";
import fs from "fs";

import { v1 as uuidv1 } from "uuid";
// import multerS3 from "multer-s3";
// import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
// });

// export const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, uuidv1() + "-" + file.originalname);
//     },
//   }),
// });

export const imageUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

// Middleware function to resize and compress the uploaded image
export const resizeImage = async (req, res, next) => {
  if (!req.file) {
    return next(); // No file to process, move to the next middleware
  }

  try {
    // Read the uploaded image file using sharp
    await sharp(req.file.path)
      .resize({ width: 800 }) // Set desired image width
      .toFile(req.file.destination + "/resized-" + req.file.filename); // Save the resized image

    // Delete the original file
    fs.unlinkSync(req.file.path);

    next();
  } catch (error) {
    console.error("Error processing image:", error);
    return res.status(500).json({ error: "Image processing failed" });
  }
};
