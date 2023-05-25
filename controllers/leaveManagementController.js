import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import LeaveManagementModel from "../models/LeaveManagementModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/leaveManagement/addleave
// Access: Public
export const addleave = asyncHandler(async (req, res, next) => {
  const { employeeId, leaveType, dateFrom, dateTo, leaveDay } = req.body;

  const userExist = await EmployeeModel.findById({
    _id: mongoose.Types.ObjectId(employeeId),
  });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new provident fund
  const leave = await LeaveManagementModel.create({
    employeeId,
    leaveType,
    dateFrom,
    dateTo,
    leaveDay,
  });

  const data = {
    id: leave._id,
    leaveType: leave.leaveType,
    dateFrom: leave.dateFrom,
    dateTo: leave.dateTo,
    leaveDay: leave.leaveDay,
  };

  if (leave) {
    res.status(200).json(success("Leave Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/leaveManagement/update/:leaveId
// Access: Public

export const updateleave = asyncHandler(async (req, res) => {
  const { leaveId } = req.params;
  const { leaveDetails } = req.body;

  const idExist = await LeaveManagementModel.findOne({
    _id: leaveId,
  });

  if (!idExist) {
    return res
      .status(409)
      .json(useErrorResponse("No Leaves found with this Id", res.statusCode));
  }

  const updatedIncrement = await LeaveManagementModel.updateOne(
    { _id: leaveId },
    {
      $set: {
        ...leaveDetails,
        approvingUserId: req.user._id,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Leave updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/leaveManagement/
// Access: Public

export const leaveList = asyncHandler(async (req, res) => {
  const leave = await LeaveManagementModel.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "employeeId",
        foreignField: "_id",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    fullName: 1,
                  },
                },
              ],
              as: "userDetails",
            },
          },
          {
            $project: {
              designation: 1,
              userDetails: 1,
            },
          },
        ],
        as: "employeesData",
      },
    },
  ]);

  res.status(200).json(success("Leave List get Successful", leave));
});

// Request: GET
// Route: GET /api/v1/leaveManagement/:employeeId
// Access: Public

export const singleEmployeeLeave = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const leaves = await LeaveManagementModel.find({ employeeId }).populate({
    path: "employeeId",
    populate: { path: "userId" },
  });

  res.status(200).json(success("Leaves List get Successful", leaves));
});
