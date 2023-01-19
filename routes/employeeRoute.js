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
  getAllEmployees,
  addRole
} from "../controllers/employeeController.js";


router.post("/addEmployee", protectRoute, addEmployee);
router.post("/login", authEmployee);
router.get("/", getAllEmployees);
router.post("/addRole", addRole);

export default router;