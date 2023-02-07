import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addHoliday,
  holidayList,
  updateHoliday,
} from "../controllers/holidayController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addHoliday", addHoliday);
router.get("/", holidayList);
router.put("/update/:holidayId", updateHoliday);

// router.post("/login/:branchId", loginClient);

export default router;
