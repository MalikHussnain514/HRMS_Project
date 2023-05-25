import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// middleware
import { imageUpload, resizeImage } from "../middlewares/imageUpload.js";

// utils

import { success } from "../utils/apiResponse.js";

router.post("/", imageUpload.single("image"), resizeImage, (req, res) => {
  res
    .status(200)
    .json(success("Image Upload Successfully", req?.file?.filename));
});

export default router;
