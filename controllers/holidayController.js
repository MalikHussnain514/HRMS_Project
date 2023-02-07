import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import HolidayModel from "../models/HolidayModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/holiday/addHoliday
// Access: Public
export const addHoliday = asyncHandler(async (req, res, next) => {
  const { userId, holidayDate, description } = req.body;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new holioday
  const holiday = await HolidayModel.create({
    userId,
    holidayDate,
    description,
  });

  const data = {
    id: holiday._id,
    holidayDate: holiday.holidayDate,
    description: holiday.description,
  };

  if (holiday) {
    res.status(200).json(success("Holiday Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/holiday/update/:holidayId
// Access: Public
export const updateHoliday = asyncHandler(async (req, res) => {
  const { holidayId } = req.params;
  const { holidayDetails } = req.body;

  const updatedHoliday = await HolidayModel.updateOne(
    { _id: holidayId },
    {
      $set: {
        ...holidayDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Holiday updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/salaryholidayStatement/
// Access: Public
export const holidayList = asyncHandler(async (req, res) => {
  const holidays = await HolidayModel.find({});

  res.status(200).json(success("Holiday List get Successful", holidays));
});
