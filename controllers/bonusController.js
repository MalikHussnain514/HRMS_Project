import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import BonusModel from "../models/BonusModel.js";
import EmployeeModel from "../models/EmployeeModel.js";
import UsersModel from "../models/UsersModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/bonus/add
// Access: Public

export const addBonus = asyncHandler(async (req, res, next) => {
  const { bonusName, designation, bonusAmount, bonusMonth } = req.body;
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

  const idExist = await BonusModel.findOne({ _id: bonusId });

  if (!idExist) {
    return res
      .status(409)
      .json(useErrorResponse("No Bonus found with this Id", res.statusCode));
  }

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
  const bonus = await UsersModel.aggregate([
    {
      $lookup: {
        from: "bonus",
        localField: "_id",
        foreignField: "userId",
        as: "bonusData",
      },
    },
    {
      $match: {
        "bonusData.0": { $exists: true },
      },
    },
  ]);

  res.status(200).json(success("Bonus List get Successful", bonus));
});

// Request: DELETE
// Route: Delete /api/v1/bonus/delete/:id
// Access: Public
export const deleteBonus = async (req, res) => {
  const { bonusId } = req.params;

  try {
    const deleteBonus = await BonusModel.findByIdAndDelete({
      _id: bonusId,
    });

    if (!deleteBonus) {
      return res.status(404).json(useErrorResponse("Bonus does not exist"));
    }

    return res
      .status(200)
      .json(success("Bonus deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
