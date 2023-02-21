import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addProvidentFund,
  providentFundList,
  updateProvidentFund,
  deleteProvidentFund,
} from "../controllers/providentFundController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addProvidentFund/:userId", addProvidentFund);
router.get("/", providentFundList);
router.put("/update/:providentFundId", updateProvidentFund);
router.delete("/delete/:providentFundId", deleteProvidentFund);

// router.post("/login/:branchId", loginClient);

export default router;
