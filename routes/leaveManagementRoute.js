import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addleave,
  leaveList,
  singleEmployeeLeave,
  updateleave,
} from "../controllers/leaveManagementController.js";
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

router.post("/addleave", addleave);
router.get("/", protectRoute, isAdminOrManager, leaveList);
router.get("/:employeeId", singleEmployeeLeave);
router.put("/update/:leaveId", protectRoute, isAdminOrManager, updateleave);

export default router;
