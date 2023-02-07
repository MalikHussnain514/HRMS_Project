import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";
// import crypto from "crypto";
import dotenv from "dotenv";
import { roles } from "../utils/enums.js";
import bcrypt from "bcryptjs";
// import https from "https";
import mongoose from "mongoose";

dotenv.config();

// Import model
import EmployeeModel from "../models/EmployeeModel.js";
import UsersModel from "../models/UsersModel.js";
import RoleModel from "../models/RoleModel.js";
import AdminModel from "../models/AdminModel.js";

// Utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";

export const addRole = asyncHandler(async (req, res) => {
  const { role, isActive } = req.body;
  const roles = await RoleModel.create({
    role,
    isActive,
  });

  const data = {
    _id: role._id,
    role: roles.role,
    isActive: roles.idActive,
  };
  if (roles) {
    res
      .status(200)
      .json(success("Role Added Successfully", data, res.statusCode));
  }
});

// Request: POST
// Route: POST /api/v1/users/register
// Access: Public
export const addEmployee = asyncHandler(async (req, res) => {
  const {
    joiningDate,
    fullName,
    contact,
    email,
    password,
    designation,
    workingDay,
    basicPay,
    gender,
    addReference,
  } = req.body;

  const isExistWithContact = await UsersModel.findOne({ contact });
  const isExistWithEmail = await UsersModel.findOne({ email });

  if (isExistWithContact) {
    return res
      .status(409)
      .json(
        useErrorResponse(
          "Employee Already exist with this phone number",
          res.statusCode
        )
      );
  }
  if (isExistWithEmail) {
    return res
      .status(409)
      .json(
        useErrorResponse(
          "Employee Already exist with this email address",
          res.statusCode
        )
      );
  }
  // const userId = "63c66cb9547c4e16a4e23c20";
  const userId = req.user._id;
  console.log("userId from here", userId);
  const { companyId } = await AdminModel.findOne({
    userId: mongoose.Types.ObjectId(userId),
  });
  console.log("first", companyId);

  const roleId = await RoleModel.findOne({ role: roles.EMPLOYEE });

  // Create new user

  const user = await UsersModel.create({
    fullName,
    contact,
    email,
    password,
    role: roleId._id,
  });

  const employeeIdCount = (await EmployeeModel.find().count()) + 1;
  console.log("empCount1", employeeIdCount);

  const employee = await EmployeeModel.create({
    joiningDate,
    employeeId: employeeIdCount,
    userId: mongoose.Types.ObjectId(user._id),
    designation,
    workingDay,
    basicPay,
    gender,
    addReference,
    companyId: companyId,
  });

  const data = {
    _id: employee._id,
    joiningDate: employee.joiningDate,
    employeeId: employee.employeeId,
    fullName: user.fullName,
    email: user.email,
    contact: user.contact,
    designation: employee.designation,
    workingDay: employee.workingDay,
    basicPay: employee.basicPay,
    gender: employee.gender,
    addReference: employee.addReference,
  };

  if (user && employee) {
    res
      .status(200)
      .json(success("Employee Added Successfully", data, res.statusCode));
  }
});

export const authEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json(
        useErrorResponse("Please enter email and password", res.statusCode)
      );
  }

  const employee = await UsersModel.findOne({ email });

  if (!employee) {
    return res
      .status(422)
      .json(useErrorResponse("No employee found", res.statusCode));
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
    token: generateWebToken(employee._id),
  };

  if (employee && isMatched) {
    res
      .status(200)
      .json(
        success(
          `Employee ${employee.fullName} loggedIn successfully`,
          data,
          res.statusCode
        )
      );
  }
});

// Request: GET
// Route: GET /api/employees/allemployees
// Access: Private
export const getAllEmployeesWithDetails = asyncHandler(async (req, res) => {
  const employees = await EmployeeModel.find({}).populate("userId");
  // const employees = await UsersModel.aggregate([
  //     {
  //       $lookup: {
  //         from: "employees",
  //         localField: "_id",
  //         foreignField: "userId",
  //         as: "employeeData",
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "admins",
  //         localField: "_id",
  //         foreignField: "userId",
  //         as: "adminsData",
  //       },
  //     },
  // ]);
  const total = employees.length;

  res.status(200).json({ employees, totalNumberOfRecords: total });
});

// Request: GET
// Route: GET /api/employees/allemployees
// Access: Private
export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await EmployeeModel.find({})
    .populate("userId", "fullName")
    .select("_id");

  res.status(200).json(employees);
});

export const updateEmployee = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { userDetail, employeeDetail } = req.body;
  // console.log(userId, userDetail, employeeDetail);

  const updatedUser = await UsersModel.updateOne(
    { _id: userId },
    {
      $set: {
        ...userDetail,
      },
    },
    { new: true }
  );

  const updatedEmployee = await EmployeeModel.updateOne(
    { userId: userId },
    {
      $set: {
        ...employeeDetail,
      },
    },
    { new: true }
  );

  res.status(202).json(success("Information updated Successfully"));
});
