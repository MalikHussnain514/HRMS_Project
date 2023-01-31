import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createReference,
  getAllReferences,
  getReferenceById,
  // updateClient,
} from "../controllers/referenceController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addReference", createReference);
router.get("/", getAllReferences);
router.get("/profile/:referenceId", getReferenceById);
// router.put(
//   "/update/:clientId",
//   protectRoute,
//   updateClientValidate,
//   updateClient
// );

// router.post("/login/:branchId", loginClient);

export default router;
