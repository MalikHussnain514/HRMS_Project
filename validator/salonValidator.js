import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateSalon = (req, res, next) => {
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

export const createSalonValidate = [
  check("salonTitle")
    .trim()
    .notEmpty()
    .withMessage("Salon Name must be required"),

  validateSalon,
];

export const updateSalonValidate = [
  check("salonTitle")
    .trim()
    .notEmpty()
    .withMessage("Salon Name must be required"),
  check("salonId").trim().notEmpty().withMessage("Salon ID must be required"),
  check("isActive").trim().notEmpty().withMessage("Is Active must be required"),

  validateSalon,
];

export const deleteSalonValidate = [
  check("salonId").notEmpty().withMessage("Salon ID must be required"),
  validateSalon,
];

export const registerSalonValidate = [
  check("salonTitle").notEmpty().withMessage("Salon Title must be required"),
  check("fullName").notEmpty().withMessage("Full Name must be required"),
  check("email").notEmpty().isEmail().withMessage("Email must be valid"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be required or Minimum length is 6"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Contact Number must be required"),
  check("branchLocation")
    .notEmpty()
    .withMessage("Branch Location must be required"),

  validateSalon,
];
