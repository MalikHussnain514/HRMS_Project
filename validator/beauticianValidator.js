import { validationResult, check } from "express-validator";

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateBeautician = (req, res, next) => {
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

export const createBeauticianValidate = [
  check("fullName").notEmpty().withMessage("Full Name must be required"),
  check("contactNumber")
    .notEmpty()
    .withMessage("Contact Number must be required"),
  check("branchId").notEmpty().withMessage("Branch ID must be required"),
  check("salonId").notEmpty().withMessage("Salon ID must be required"),
  check("serviceId").notEmpty().withMessage("Services must be required"),
  validateBeautician,
];

export const getBeauticianValidate = [
  check("branchId").notEmpty().withMessage("Branch ID must be required"),

  validateBeautician,
];

export const getBeauticainByWorkingServicesValidate = [
  check("serviceId").notEmpty().withMessage("Service ID must be required"),

  validateBeautician,
];

export const updateBeauticianValidate = [
  check("beauticianId")
    .notEmpty()
    .withMessage("Beautician ID must be required"),

  validateBeautician,
];
