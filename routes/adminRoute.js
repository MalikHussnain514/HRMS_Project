import express from "express";
const router = express.Router();

// Autherization
import {
  protectRoute,
  // AdminAuthentication,
} from "../middlewares/authentication.js";

// Controllers
import {
  adminRegister,
  authAdmin,
  // verifyUser,
  // forgotPassword,
  // resetpassword,
  getProfile,
  // updateProfile,
  getAllAdmins,
  getCountOfEmployeeAndClient
  // verifyOtp,
} from "../controllers/adminController.js";

// Validator
// import {
//   userRegisterValidate,
//   userLoginValidate,
//   // userForgotPasswordValidate,
//   // userResetPasswordValidate,
// } from "../validator/userValidator.js";

router.post("/register", adminRegister);
// router.put("/emailverify/:verifytoken", verifyUser);
router.post("/login", authAdmin);
router.get("/", getAllAdmins);
router.get("/count", getCountOfEmployeeAndClient);
// router.post("/forgotpassword", userForgotPasswordValidate, forgotPassword);
// router.post("/verifyotp", verifyOtp);
// router.put("/resetpassword", userResetPasswordValidate, resetpassword);
router.get("/profile/:userId", getProfile);
// router.put("/profile/:userId", protectRoute, updateProfile);

export default router;
