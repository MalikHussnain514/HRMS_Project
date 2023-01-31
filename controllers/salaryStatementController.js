import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import SalaryStatementModel from "../models/SalaryStatementModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/salaryStatement/addSalaryStatement
// Access: Public

export const addSalaryStatement = asyncHandler(async (req, res, next) => {
  const {
    salaryStatementDate,
    basicSalary,
    userId,
    employeeType,
    designation,
    providentFund,
    grossSalary,
  } = req.body;

  // Create new bonus
  const salaryStatement = await SalaryStatementModel.create({
    salaryStatementDate,
    basicSalary,
    userId,
    employeeType,
    designation,
    providentFund,
    grossSalary,
  });

  const data = {
    id: salaryStatement._id,
    salaryStatementDate: salaryStatement.salaryStatementDate,
    basicSalary: salaryStatement.basicSalary,
    employeeType: salaryStatement.employeeType,
    designation: salaryStatement.designation,
    providentFund: salaryStatement.providentFund,
    grossSalary: salaryStatement.grossSalary,
  };

  if (salaryStatement) {
    res.status(200).json(success("Salary Statement Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/salaryStatement/update/:salaryStatementId
// Access: Public
export const updateSalaryStatement = asyncHandler(async (req, res) => {
  const { salaryStatementId } = req.params;
  const { salaryStatementDetails } = req.body;

  const updatedSalaryStatement = await SalaryStatementModel.updateOne(
    { _id: salaryStatementId },
    {
      $set: {
        ...salaryStatementDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Salary Statement updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/salaryStatement/
// Access: Public
export const salaryStatementList = asyncHandler(async (req, res) => {
  const salaryStatement = await SalaryStatementModel.find({});

  res.status(200).json(success("Salary Statement List get Successful", salaryStatement));
});
