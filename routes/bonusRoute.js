import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addBonus,
  updateBonus,
  bonusList,
  bonusSingleEmployee,
  deleteBonus,
} from "../controllers/bonusController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addBonus/:userId", addBonus);
router.get("/", bonusList);
router.get("/:userId", bonusSingleEmployee);
router.put("/update/:bonusId", updateBonus);
router.delete("/delete/:bonusId", deleteBonus);

// router.post("/login/:branchId", loginClient);

export default router;
