import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import IncrementModel from "../models/IncrementModel.js";
import EmployeeModel from "../models/EmployeeModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import UsersModel from "../models/UsersModel.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/increment/addIncrement
// Access: Public
export const addIncrement = asyncHandler(async (req, res, next) => {
  const { incrementDate, incrementAmount, incrementPurpose } = req.body;
  const { userId } = req.params;

  const userExist = await EmployeeModel.findOne({ userId });

  if (!userExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("Employee does not exist with this Id", res.statusCode)
      );
  }

  // Create new provident fund
  const increment = await IncrementModel.create({
    userId,
    incrementDate,
    incrementAmount,
    incrementPurpose,
  });

  const data = {
    id: increment._id,
    incrementDate: increment.incrementDate,
    incrementAmount: increment.incrementAmount,
    incrementPurpose: increment.incrementPurpose,
  };

  if (increment) {
    res.status(200).json(success("Increment Added Successfully", data));
  }
});

// Request: PUT
// Route: PUT /api/v1/increment/update/:incrementId
// Access: Public
export const updateIncrement = asyncHandler(async (req, res) => {
  const { incrementId } = req.params;
  const { incrementDetails } = req.body;

  const idExist = await IncrementModel.findOne({
    _id: incrementId,
  });

  if (!idExist) {
    return res
      .status(409)
      .json(
        useErrorResponse("No Increments found with this Id", res.statusCode)
      );
  }

  const updatedIncrement = await IncrementModel.updateOne(
    { _id: incrementId },
    {
      $set: {
        ...incrementDetails,
      },
    },
    { new: true }
  );

  res.status(200).json(success("Increment updated Successfully"));
});

// Request: GET
// Route: GET /api/v1/increment/
// Access: Public
export const incrementList = asyncHandler(async (req, res) => {
  const increment = await UsersModel.aggregate([
    {
      $lookup: {
        from: "increments",
        localField: "_id",
        foreignField: "userId",
        as: "IncrementData",
      },
    },
    {
      $match: {
        "IncrementData.0": { $exists: true },
      },
    },
  ]);

  res.status(200).json(success("Increment List get Successful", increment));
});

// Request: GET
// Route: GET /api/v1/increment/:userId
// Access: Public

export const singleEmployeeIncrement = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const increment = await IncrementModel.find({ userId }).populate("userId");

  // increment = JSON.parse(JSON.stringify(increment));
  // increment = increment.map((inc) => {
  //   const { userId } = inc;
  //   userId["name"] = userId.fullName;
  //   delete userId.fullName;
  //   return {
  //     ...inc,
  //     userId,
  //   };
  // });

  // for (let i = 0; i < increment.length; i++) {
  //   increment[i].userId.name = increment[i].userId.fullName;
  //   delete increment[i].userId.fullName;
  // }

  res.status(200).json(success("Increment Single Employee get", increment));
});

// export const singleEmployeeIncrement = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   const increments = await IncrementModel.aggregate([
//     // Match increments for specified user ID
//     { $match: { userId: mongoose.Types.ObjectId(userId) } },
//     // Group increments by user ID and create array of increments
//     {
//       $group: {
//         _id: "$userId",
//         increments: {
//           $push: {
//             incrementDate: "$incrementDate",
//             incrementAmount: "$incrementAmount",
//             incrementPurpose: "$incrementPurpose",
//           },
//         },
//         user: { $first: "$userId" },
//       },
//     },
//     // Populate user object
//     {
//       $lookup: {
//         from: "users",
//         localField: "user",
//         foreignField: "_id",
//         as: "user",
//       },
//     },
//     {
//       $project: {
//         "user.password": 0,
//         "user.role": 0,
//       },
//     },
//     { $unwind: "$user" },
//   ]);

//   res.status(200).json(success("Increment Single Employee get", increments[0]));
// });

// Request: DELETE
// Route: Delete /api/v1/increment/delete/:id
// Access: Public
export const deleteIncrement = async (req, res) => {
  const { incrementId } = req.params;

  try {
    const deleteIncrement = await IncrementModel.findByIdAndDelete({
      _id: incrementId,
    });

    if (!deleteIncrement) {
      return res.status(404).json(useErrorResponse("Increment does not exist"));
    }

    return res
      .status(200)
      .json(success("Incrment deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
