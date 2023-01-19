import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateCategory = (req, res, next) => {
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

export const createCategoryValidate = [
  check("categoryTitle")
    .notEmpty()
    .withMessage("category Title must be required"),
  check("branchId").notEmpty().withMessage("branch Id must be required"),
  validateCategory,
];

export const deleteCategoryValidate = [
  check("categoryId").notEmpty().withMessage("category ID must be required"),

  validateCategory,
];

export const updateCategoryValidate = [
  check("categoryId").notEmpty().withMessage("category ID must be required"),

  validateCategory,
];

export const getCategoryValidate = [
  check("branchId").notEmpty().withMessage("Branch ID must be required"),
  validateCategory,
];
