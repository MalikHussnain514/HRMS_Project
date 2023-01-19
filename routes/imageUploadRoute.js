import express from "express";

const router = express.Router();

// Authentication
import { protectRoute } from "../middlewares/authentication.js";

// middleware
import { uploadS3 } from "../middlewares/imageUpload.js";

// utils

import { success } from "../utils/apiResponse.js";

router.post("/", protectRoute, uploadS3.single("image"), (req, res) => {
  res
    .status(200)
    .json(success("Image Upload Successfully", req?.file?.location));
});

export default router;
