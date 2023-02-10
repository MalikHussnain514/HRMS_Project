import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";
import dotenv from "dotenv";

dotenv.config();

// Import model
import UsersModel from "../models/UsersModel.js";

// Utils
import { success, useErrorResponse } from "../utils/apiResponse.js";

// Request: POST
// Route: POST /api/v1/users/login
// Access: Public
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json(
        useErrorResponse("Please enter email and password", res.statusCode)
      );
  }

  const employee = await UsersModel.findOne({ email }).populate("role");
  // const employeeRole = await UsersModel.findOne({ email }).populate("role");
  // console.log("role is here", employeeRole);

  if (!employee) {
    return res
      .status(422)
      .json(useErrorResponse("No user found", res.statusCode));
  }

  const isMatched = await employee.matchPassword(password);

  if (!isMatched) {
    return res
      .status(422)

      .json(
        useErrorResponse(
          "Please enter Phone Number and password",
          res.statusCode
        )
      );
  }

  const data = {
    id: employee._id,
    fullName: employee.fullName,
    email: employee.email,
    contact: employee.contact,
    role: employee.role,
    token: generateWebToken(employee._id),
  };

  if (employee && isMatched) {
    res
      .status(200)
      .json(
        success(
          `${employee.fullName} loggedIn successfully`,
          data,
          res.statusCode
        )
      );
  }
});
