import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addSalaryStatement,
  salaryStatementList,
  singleEmployeeSalaryStatement,
  updateSalaryStatement,
  deleteSalaryStatement,
} from "../controllers/salaryStatementController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addSalaryStatement/:userId", addSalaryStatement);
router.get("/", salaryStatementList);
router.get("/:userId", singleEmployeeSalaryStatement);
router.put("/update/:salaryStatementId", updateSalaryStatement);
router.delete("/delete/:salaryStatementId", deleteSalaryStatement);

// router.post("/login/:branchId", loginClient);

export default router;
