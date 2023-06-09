import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addClient", createClient);
router.get("/", getAllClients);
router.get("/profile/:clientId", getClientById);
router.put(
  "/update/:clientId",
  updateClient
);
router.delete("/delete/:clientId", deleteClient);

// router.post("/login/:branchId", loginClient);

export default router;
