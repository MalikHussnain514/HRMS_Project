import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createOvertime,
  updateOvertime,
  getAllOvertime,
  getOvertimeSingleUser,
  deleteOvertime,
} from "../controllers/overtimeController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addOvertime/:userId", createOvertime);
router.get("/", getAllOvertime);
router.get("/:userId", getOvertimeSingleUser);
router.put("/update/:overtimeId", updateOvertime);
router.delete("/delete/:overtimeId", deleteOvertime);

// router.post("/login/:branchId", loginClient);

export default router;
