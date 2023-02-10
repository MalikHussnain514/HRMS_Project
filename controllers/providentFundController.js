import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import ProvidentFundModel from "../models/ProvidentFundModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/providentFund/addProvidentFund
// Access: Public
export const addProvidentFund = asyncHandler(async (req, res, next) => {
  const { userId, subscriptionAmount, contributionAmount, loanDate } = req.body;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new provident fund
  const providentFund = await ProvidentFundModel.create({
    userId,
    subscriptionAmount,
    contributionAmount,
    loanDate,
  });

  const data = {
    id: providentFund._id,
    subscriptionAmount: providentFund.subscriptionAmount,
    contributionAmount: providentFund.contributionAmount,
    loanDate: providentFund.loanDate,
  };

  if (providentFund) {
    res.status(200).json(success("Provident Fund Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/providentFund/update/:providentFundId
// Access: Public
export const updateProvidentFund = asyncHandler(async (req, res) => {
  const { providentFundId } = req.params;
  const { providentFundDetails } = req.body;

  const idExist = await ProvidentFundModel.findOne({
    _id: providentFundId,
  });

  if (!idExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("No Provident Fund found with this Id", res.statusCode)
      );
  }

  const updatedProvidentFund = await ProvidentFundModel.updateOne(
    { _id: providentFundId },
    {
      $set: {
        ...providentFundDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Provident Fund updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/providentFund/
// Access: Public
export const providentFundList = asyncHandler(async (req, res) => {
  const providentFund = await UsersModel.aggregate([
    {
      $lookup: {
        from: "providentfunds",
        localField: "_id",
        foreignField: "userId",
        as: "ProvidentFundData",
      },
    },
    {
      $match: {
        "ProvidentFundData.0": { $exists: true },
      },
    },
  ]);

  res
    .status(200)
    .json(success("Provident Fund List get Successful", providentFund));
});
