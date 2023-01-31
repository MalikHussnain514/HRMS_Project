import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addBonus,
  updateBonus,
  bonusList,
} from "../controllers/bonusController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addBonus", addBonus);
router.get("/", bonusList);
router.put("/update/:bonusId", updateBonus);

// router.post("/login/:branchId", loginClient);

export default router;
