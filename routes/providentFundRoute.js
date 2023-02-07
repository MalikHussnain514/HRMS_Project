import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addProvidentFund,
  providentFundList,
  updateProvidentFund,
} from "../controllers/providentFundController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addProvidentFund", addProvidentFund);
router.get("/", providentFundList);
router.put("/update/:providentFundId", updateProvidentFund);

// router.post("/login/:branchId", loginClient);

export default router;
