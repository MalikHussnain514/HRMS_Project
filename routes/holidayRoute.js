import express from "express";

const router = express.Router();

// Authentication
// import { protectRoute } from "../middlewares/authentication.js";

// controller
import {
  addHoliday,
  holidayList,
  holidaySingle,
  updateHoliday,
  deleteHoliday,
} from "../controllers/holidayController.js";

// validator
// import {
//   createClientValidate,
//   getAllClientValidate,
//   updateClientValidate,
// } from "../validator/clientValidator.js";

router.post("/addHoliday/:userId", addHoliday);
router.get("/", holidayList);
router.get("/:userId", holidaySingle);
router.put("/update/:holidayId", updateHoliday);
router.delete("/delete/:holidayId", deleteHoliday);

// router.post("/login/:branchId", loginClient);

export default router;
