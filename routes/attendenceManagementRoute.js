import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addAttendenceIn,
  addAttendenceOut,
  attendenceList,
  attendenceSingleEmployee,
} from "../controllers/attendenceManagementController.js";
import {
  isAdminOrManager,
  protectRoute,
} from "../middlewares/authentication.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addAttendenceIn", addAttendenceIn);
router.post("/addAttendenceOut", addAttendenceOut);
router.get("/", protectRoute, isAdminOrManager, attendenceList);
router.get("/:id", attendenceSingleEmployee);

export default router;
