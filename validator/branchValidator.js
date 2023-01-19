import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateBranch = (req, res, next) => {
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

export const branchCreateValidate = [
  check("salonId").notEmpty().withMessage("Salon Id must be required"),
  check("contactNumber").notEmpty().withMessage("Contact Number is required"),

  validateBranch,
];
