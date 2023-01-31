import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addSalaryStatement,
  salaryStatementList,
  updateSalaryStatement,
} from "../controllers/salaryStatementController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addSalaryStatement", addSalaryStatement);
router.get("/", salaryStatementList);
router.put("/update/:salaryStatementId", updateSalaryStatement);

// router.post("/login/:branchId", loginClient);

export default router;
