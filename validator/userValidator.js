import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    if (!errors.isEmpty()) {
      for (let err in errors.errors) {
        return res
          .status(422)
          .json(useErrorResponse(errors.errors[err].msg, res.statusCode));
      }
    }
  }

  next();
};

export const userRegisterValidate = [
  check("fullName").trim().notEmpty().withMessage("Full Name must be required"),
  check("password").notEmpty().withMessage("Password is required"),
  check("gender").trim().notEmpty().withMessage("Gender is required"),
  check("contactNumber").notEmpty().withMessage("Contact Number is required"),
  check("bio").notEmpty().withMessage("Bio is required"),
  check("salonId").notEmpty().withMessage("Saloon Id is required"),
  check("branchId").notEmpty().withMessage("Branch Id is required"),
  validateUser,
];

export const userLoginValidate = [
  check("email").notEmpty().isEmail().withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  validateUser,
];

export const userForgotPasswordValidate = [
  check("contactNumber").notEmpty().withMessage("Contact Number is required"),
  validateUser,
];

export const userResetPasswordValidate = [
  check("password").notEmpty().withMessage("Password is required"),
  validateUser,
];
