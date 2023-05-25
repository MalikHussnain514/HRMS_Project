import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import HolidayModel from "../models/HolidayModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/holiday/addHoliday
// Access: Public
export const addHoliday = asyncHandler(async (req, res, next) => {
  const { holidayDate, description } = req.body;
  const { userId } = req.params;

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

  const idExist = await HolidayModel.findOne({
    _id: holidayId,
  });

  if (!idExist) {
    return res
      .status(409)
      .json(useErrorResponse("No Holidays found with this Id", res.statusCode));
  }

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
// Route: GET /api/v1/holiday/
// Access: Public
export const holidayList = asyncHandler(async (req, res) => {
  const holidays = await UsersModel.aggregate([
    {
      $lookup: {
        from: "holidays",
        localField: "_id",
        foreignField: "userId",
        as: "holidayData",
      },
    },
    {
      $match: {
        "holidayData.0": { $exists: true },
      },
    },
  ]);

  res.status(200).json(success("Holiday List get Successful", holidays));
});

// Request: GET
// Route: GET /api/v1/holiday/:userId
// Access: Public
export const holidaySingle = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const holiday = await HolidayModel.find({ userId }).populate("userId");

  res.status(200).json(success("Holiday List get Successful", holiday));
});

// Request: DELETE
// Route: Delete /api/v1/holiday/delete/:id
// Access: Public
export const deleteHoliday = async (req, res) => {
  const { holidayId } = req.params;

  try {
    const deleteHoliday = await HolidayModel.findByIdAndDelete({
      _id: holidayId,
    });

    if (!deleteHoliday) {
      return res.status(404).json(useErrorResponse("Holiday does not exist"));
    }

    return res
      .status(200)
      .json(success("Holiday deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
