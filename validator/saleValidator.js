import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateSale = (req, res, next) => {
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

export const getSaleValidate = [
  check("branchId").notEmpty().withMessage("Branch ID must be required"),
  validateSale,
];
