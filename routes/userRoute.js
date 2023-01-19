import express from "express";
const router = express.Router();

// Autherization
// import {
//   protectRoute,
//   // AdminAuthentication,
// } from "../middlewares/authentication.js";

// Controllers
import {
  userLogin,
} from "../controllers/userController.js";

router.post("/login", userLogin);

export default router;
