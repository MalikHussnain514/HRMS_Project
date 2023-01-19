import express from "express";

const router = express.Router();

// Authentication
import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createClient,
  // getAllClient,
  // updateClient,
  // loginClient,
} from "../controllers/clientController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/create", createClient);
// router.get("/all/:branchId", protectRoute, getAllClientValidate, getAllClient);
// router.put(
//   "/update/:clientId",
//   protectRoute,
//   updateClientValidate,
//   updateClient
// );

// router.post("/login/:branchId", loginClient);

export default router;
