import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateService = (req, res, next) => {
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

export const createServiceValidate = [
  check("categoryId").notEmpty().withMessage("category Id must be required"),
  check("serviceTitle")
    .notEmpty()
    .withMessage("service Title must be required"),
  check("duration").notEmpty().withMessage("duration must be required"),
  check("price").notEmpty().withMessage("price must be required"),

  validateService,
];

export const deleteServiceValidate = [
  check("serviceId").notEmpty().withMessage("Service Id must be required"),
  validateService,
];

export const updateServiceValidate = [
  check("serviceId").notEmpty().withMessage("service Id must be required"),

  validateService,
];
