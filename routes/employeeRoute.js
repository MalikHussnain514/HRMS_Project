import express from "express";
const router = express.Router();


// Autherization
import {
  protectRoute,
  // AdminAuthentication,
} from "../middlewares/authentication.js";

// Controllers
import {
  addEmployee,
  authEmployee,
  getAllEmployeesWithDetails,
  getAllEmployees,
  updateEmployee,
  addRole,
} from "../controllers/employeeController.js";


router.post("/addEmployee", protectRoute, addEmployee);
router.put("/updateEmployee/:userId", updateEmployee);
router.post("/login", authEmployee);
router.get("/", getAllEmployeesWithDetails);
router.get("/get", getAllEmployees);
router.post("/addRole", addRole);

export default router;