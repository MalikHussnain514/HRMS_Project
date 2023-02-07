import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import ExpenceModel from "../models/ExpenceModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/reference/create
// Access: Public

export const createExpence = asyncHandler(async (req, res, next) => {
  const { userId, expenceDate, expencePurpose, expenceAmount, chequeNo } =
    req.body;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new Expence
  const expence = await ExpenceModel.create({
    userId,
    expenceDate,
    expencePurpose,
    expenceAmount,
    chequeNo,
  });

  const data = {
    id: expence._id,
    expenceDate: expence.expenceDate,
    expencePurpose: expence.expencePurpose,
    expenceAmount: expence.expenceAmount,
    chequeNo: expence.chequeNo,
  };

  if (expence) {
    res.status(200).json(success("Expence Registered Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/expence/update/:expenceId
// Access: Public
export const updateExpence = asyncHandler(async (req, res) => {
  const { expenceId } = req.params;
  const { expenceDetails } = req.body;

  const updatedExpence = await ExpenceModel.updateOne(
    { _id: expenceId },
    {
      $set: {
        ...expenceDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Expence updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/expence/
// Access: Public

export const getAllExpences = asyncHandler(async (req, res) => {
  const expenses = await ExpenceModel.find({});

  res.status(200).json(success("Expences List get Successful", expenses));
});
