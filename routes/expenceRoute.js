import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createExpence,
  //   getAllReferences,
  //   getReferenceById,
  updateExpence,
  getAllExpences,
} from "../controllers/expenceController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addExpence", createExpence);
router.get("/", getAllExpences);
// router.get("/", getAllReferences);
// router.get("/profile/:referenceId", getReferenceById);
router.put(
  "/update/:expenceId", updateExpence
);

// router.post("/login/:branchId", loginClient);

export default router;
