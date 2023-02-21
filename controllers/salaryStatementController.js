import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import SalaryStatementModel from "../models/SalaryStatementModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/salaryStatement/addSalaryStatement
// Access: Public

export const addSalaryStatement = asyncHandler(async (req, res, next) => {
  const {
    salaryStatementDate,
    basicSalary,
    employeeType,
    designation,
    providentFund,
    grossSalary,
  } = req.body;
  const { userId } = req.params;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

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

  const idExist = await SalaryStatementModel.findOne({
    _id: salaryStatementId,
  });

  if (!idExist) {
    return res
      .status(409)
      .json(
        useErrorResponse(
          "No Salary Statement found with this Id",
          res.statusCode
        )
      );
  }

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
  const salaryStatement = await UsersModel.aggregate([
    {
      $lookup: {
        from: "salarystatements",
        localField: "_id",
        foreignField: "userId",
        as: "salaryStatementData",
      },
    },
    {
      $match: {
        "salaryStatementData.0": { $exists: true },
      },
    },
  ]);

  res
    .status(200)
    .json(success("Salary Statement List get Successful", salaryStatement));
});

// Request: DELETE
// Route: Delete /api/v1/salaryStatement/delete/:id
// Access: Public
export const deleteSalaryStatement = async (req, res) => {
  const { salaryStatementId } = req.params;

  try {
    const deleteSalaryStatement = await SalaryStatementModel.findByIdAndDelete({
      _id: salaryStatementId,
    });

    if (!deleteSalaryStatement) {
      return res
        .status(404)
        .json(useErrorResponse("Salary Statement does not exist"));
    }

    return res
      .status(200)
      .json(
        success("Salary Statement deleted Successfully", "", res.statusCode)
      );
  } catch (error) {
    console.log("error", error);
  }
};
