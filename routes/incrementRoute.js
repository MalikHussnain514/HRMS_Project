import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addIncrement,
  incrementList,
  updateIncrement,
  deleteIncrement,
} from "../controllers/incrementController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addIncrement/:userId", addIncrement);
router.get("/", incrementList);
router.put("/update/:incrementId", updateIncrement);
router.delete("/delete/:incrementId", deleteIncrement);

// router.post("/login/:branchId", loginClient);

export default router;
