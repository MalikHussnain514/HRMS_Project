import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import OvertimeModel from "../models/OvertimeModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
import UsersModel from "../models/UsersModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/reference/create
// Access: Public

export const createOvertime = asyncHandler(async (req, res, next) => {
  const { overtimeDate, designation, overtimeHours, overtimeAmount } = req.body;
  const { userId } = req.params;

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

  const idExist = await OvertimeModel.findOne({ _id: overtimeId });

  if (!idExist) {
    return res
      .status(409)
      .json(useErrorResponse("No OverTime found with this Id", res.statusCode));
  }

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
  // const overtime = await OvertimeModel.find({});

  const overtime = await UsersModel.aggregate([
    {
      $lookup: {
        from: "overtimes",
        localField: "_id",
        foreignField: "userId",
        as: "overTimeData",
      },
    },
    {
      $match: {
        "overTimeData.0": { $exists: true },
      },
    },
  ]);

  res.status(200).json(success("Overtime List get Successful", overtime));
});

// Request: GET
// Route: GET /api/v1/overtime/:userId
// Access: Public
export const getOvertimeSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const overtime = await OvertimeModel.find({ userId }).populate("userId");

  res.status(200).json(success("Overtime Single get Successful", overtime));
});

// Request: DELETE
// Route: Delete /api/v1/overtime/delete/:id
// Access: Public
export const deleteOvertime = async (req, res) => {
  const { overtimeId } = req.params;

  try {
    const deleteOverTime = await OvertimeModel.findByIdAndDelete({
      _id: overtimeId,
    });

    if (!deleteOverTime) {
      return res.status(404).json(useErrorResponse("OverTime does not exist"));
    }

    return res
      .status(200)
      .json(success("OverTime deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
