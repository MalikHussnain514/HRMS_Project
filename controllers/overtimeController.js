import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import OvertimeModel from "../models/OvertimeModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/reference/create
// Access: Public

export const createOvertime = asyncHandler(async (req, res, next) => {
  const { userId, overtimeDate, designation, overtimeHours, overtimeAmount } =
    req.body;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new expence
  const overtime = await OvertimeModel.create({
    userId,
    overtimeDate,
    designation,
    overtimeHours,
    overtimeAmount,
  });

  const data = {
    id: overtime._id,
    overtimeDate: overtime.overtimeDate,
    designation: overtime.designation,
    overtimeHours: overtime.overtimeHours,
    overtimeAmount: overtime.overtimeAmount,
  };

  if (overtime) {
    res.status(200).json(success("OverTime Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/expence/update/:overtimeId
// Access: Public
export const updateOvertime = asyncHandler(async (req, res) => {
  const { overtimeId } = req.params;
  const { overtimeDetails } = req.body;

  const updatedOvertime = await OvertimeModel.updateOne(
    { _id: overtimeId },
    {
      $set: {
        ...overtimeDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Overtime updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/overtime/
// Access: Public
export const getAllOvertime = asyncHandler(async (req, res) => {
  const overtime = await OvertimeModel.find({});

  res.status(200).json(success("Overtime List get Successful", overtime));
});
