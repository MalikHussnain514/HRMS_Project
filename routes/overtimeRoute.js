import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createOvertime,
    updateOvertime,
    getAllOvertime,
} from "../controllers/overtimeController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addOvertime", createOvertime);
router.get("/", getAllOvertime);
router.put("/update/:overtimeId", updateOvertime);

// router.post("/login/:branchId", loginClient);

export default router;
