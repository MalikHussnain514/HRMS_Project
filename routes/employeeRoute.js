import express from "express";
const router = express.Router();

// Autherization
import {
  isAdmin,
  protectRoute,
  // AdminAuthentication,
} from "../middlewares/authentication.js";

// Controllers
import {
  addEmployee,
  authEmployee,
  getAllEmployeesWithDetails,
  getAllEmployees,
  getSingleEmployees,
  updateEmployee,
  addRole,
  deleteEmployee,
} from "../controllers/employeeController.js";

router.post("/addEmployee", protectRoute, isAdmin, addEmployee);
router.put("/updateEmployee/:userId", protectRoute, isAdmin, updateEmployee);
router.post("/login", authEmployee);
router.get("/", getAllEmployeesWithDetails);
router.get("/get", getAllEmployees);
router.get("/profile/:id", getSingleEmployees);
router.post("/addRole", addRole);
router.delete("/delete/:employeeId", protectRoute, isAdmin, deleteEmployee);

export default router;
