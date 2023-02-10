import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addIncrement,
  incrementList,
  updateIncrement,
} from "../controllers/incrementController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addIncrement", addIncrement);
router.get("/", incrementList);
router.put("/update/:incrementId", updateIncrement);

// router.post("/login/:branchId", loginClient);

export default router;
