import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import BonusModel from "../models/BonusModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/bonus/add
// Access: Public

export const addBonus = asyncHandler(async (req, res, next) => {
  const { userId, bonusName, designation, bonusAmount, bonusMonth } = req.body;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new bonus
  const bonus = await BonusModel.create({
    userId,
    bonusName,
    designation,
    bonusAmount,
    bonusMonth,
  });

  const data = {
    id: bonus._id,
    bonusName: bonus.bonusName,
    designation: bonus.designation,
    bonusAmount: bonus.bonusAmount,
    bonusMonth: bonus.bonusMonth,
  };

  if (bonus) {
    res.status(200).json(success("Bonus Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/bonus/update/:bonusId
// Access: Public
export const updateBonus = asyncHandler(async (req, res) => {
  const { bonusId } = req.params;
  const { bonusDetails } = req.body;

  const updatedBonus = await BonusModel.updateOne(
    { _id: bonusId },
    {
      $set: {
        ...bonusDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Bonus updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/bonus/
// Access: Public
export const bonusList = asyncHandler(async (req, res) => {
  const bonus = await BonusModel.find({});

  res.status(200).json(success("Bonus List get Successful", bonus));
});
