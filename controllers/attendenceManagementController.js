import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import AttendenceManagementModel from "../models/AttendenceManagementModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/attendenceManagement/addAttendenceIn
// Access: Public
export const addAttendenceIn = asyncHandler(async (req, res, next) => {
  const { employeeId, date, inTime } = req.body;
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
  //   // Create new attendence
  const attend = await AttendenceManagementModel.create({
    employeeId,
    date,
    inTime,
  });
  const data = {
    id: attend._id,
    date: attend.date,
    inTime: attend.inTime,
  };
  if (attend) {
    res.status(200).json(success("Attendence Added Successfully", data));
  }
});

// Request: POST
// Route: POST /api/v1/attendenceManagement/addAttendenceOut
// Access: Public
export const addAttendenceOut = asyncHandler(async (req, res, next) => {
  const { employeeId, date, outTime } = req.body;
  const userExist = await AttendenceManagementModel.findOne({
    employeeId,
    date,
  });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }
  //   // Create new attendence
  // const attend = new AttendenceManagementModel({
  //   employeeId,
  //   // date,
  //   outTime,
  // });

  userExist.outTime = outTime;

  await userExist.save();
  const data = {
    id: userExist._id,
    // date: attend.date,
    outTime: userExist.outTime,
  };
  if (userExist) {
    res.status(200).json(success("Attendence Added Successfully", data));
  }
});

// Request: GET
// Route: GET /api/v1/attendenceManagement/
// Access: Public

export const attendenceList = asyncHandler(async (req, res) => {
  const attend = await AttendenceManagementModel.aggregate([
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
  res.status(200).json(success("Attendence List get Successful", attend));
});

// Request: GET
// Route: GET /api/v1/attendenceManagement/id
// Access: Public

export const attendenceSingleEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const attend = await AttendenceManagementModel.find({
    employeeId: id,
  }).populate({
    path: "employeeId",
    populate: { path: "userId" },
  });
  res.status(200).json(success("Attendence of Single Employee", attend));
});
