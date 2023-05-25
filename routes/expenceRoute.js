import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createExpence,
  updateExpence,
  getAllExpences,
  getSingleUserExpences,
  deleteExpence,
} from "../controllers/expenceController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addExpence/:userId", createExpence);
router.get("/", getAllExpences);
router.get("/:userId", getSingleUserExpences);
router.put("/update/:expenceId", updateExpence);
router.delete("/delete/:expenceId", deleteExpence);

// router.post("/login/:branchId", loginClient);

export default router;
