import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import ExpenceModel from "../models/ExpenceModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/reference/create
// Access: Public

export const createExpence = asyncHandler(async (req, res, next) => {
  const { expenceDate, expencePurpose, expenceAmount, chequeNo } = req.body;
  const { userId } = req.params;

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

  const idExist = await ExpenceModel.findOne({ _id: expenceId });

  if (!idExist) {
    return res
      .status(409)
      .json(useErrorResponse("No Expense found with this Id", res.statusCode));
  }

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
  // const expenses = await ExpenceModel.find({})
  //   .populate("userId", "fullName")
  //   .select("_id");
  const expenses = await UsersModel.aggregate([
    {
      $lookup: {
        from: "expences",
        localField: "_id",
        foreignField: "userId",
        as: "expensesData",
      },
    },
    {
      $match: {
        "expensesData.0": { $exists: true },
      },
    },
  ]);

  res.status(200).json(success("Expences List get Successful", expenses));
});

// Request: DELETE
// Route: Delete /api/v1/expense/delete/:id
// Access: Public
export const deleteExpence = async (req, res) => {
  const { expenceId } = req.params;

  try {
    const deleteExpence = await ExpenceModel.findByIdAndDelete({
      _id: expenceId,
    });

    if (!deleteExpence) {
      return res.status(404).json(useErrorResponse("Expense does not exist"));
    }

    return res
      .status(200)
      .json(success("Expense deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
