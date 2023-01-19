import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateClient = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.errors.map((err) => {
      return res.status(422).json(useErrorResponse(err.msg, res.statusCode));
    });
  }

  next();
};

export const createClientValidate = [
  check("fullName")
    .matches(/^[A-Za-z ]+$/i)
    .withMessage("User Name must be Valid"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Contact Number must be required"),
  check("branchId").notEmpty().withMessage("Branch ID must be required"),
  check("salonId").notEmpty().withMessage("Salon ID must be required"),
  check("email").isEmail().withMessage("Email is not Valid"),

  validateClient,
];

export const getAllClientValidate = [
  check("branchId").notEmpty().withMessage("Branch ID must be required"),

  validateClient,
];

export const updateClientValidate = [
  check("clientId").notEmpty().withMessage("Client ID must be required"),

  validateClient,
];
