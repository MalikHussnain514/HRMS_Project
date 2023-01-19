import validator from "express-validator";
const { check, validationResult } = validator;

// utils
import { useErrorResponse } from "../utils/apiResponse.js";

const validateOrder = (req, res, next) => {
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

export const orderCreateValidate = [
  check("userId").notEmpty().withMessage("user Id must be required"),
  check("branchId").notEmpty().withMessage("branch Id must be required"),
  check("createdBy").notEmpty().withMessage("created By is required"),
  check("orderDate").notEmpty().withMessage("order Date is required"),
  check("actualOrderPrice")
    .notEmpty()
    .withMessage("actual Order Price is required"),
  check("totalOrderPrice")
    .notEmpty()
    .withMessage("total Order Price is required"),
  check("orderJob").notEmpty().withMessage("orderJob is required"),
  // check("orderJob.*.userId")
  //   .notEmpty()
  //   .withMessage("Beautician must be required"),
  check("orderJob.*.serviceId").notEmpty().withMessage("Service is required"),
  check("orderJob.*.duration").notEmpty().withMessage("Duration is required"),
  check("orderJob.*.actualPrice")
    .notEmpty()
    .withMessage("orderJob Actual Price is required"),
  check("orderJob.*.totalPrice")
    .notEmpty()
    .withMessage("orderJob total Price is required"),

  validateOrder,
];

export const allOrderGetValidate = [
  check("branchId").notEmpty().withMessage("branch Id must be required"),

  validateOrder,
];

export const getOrderValidate = [
  check("orderId").notEmpty().withMessage("Order Id must be required"),

  validateOrder,
];

export const orderUpdateValidate = [
  check("orderId").notEmpty().withMessage("Order ID must be required"),

  validateOrder,
];
