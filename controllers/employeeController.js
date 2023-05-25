import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Import model
import EmployeeModel from "../models/EmployeeModel.js";
import UsersModel from "../models/UsersModel.js";
import RoleModel from "../models/RoleModel.js";
import AdminModel from "../models/AdminModel.js";

// Utils
import { success, useErrorResponse } from "../utils/apiResponse.js";

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
    referenceId,
    image,
    role,
  } = req.body;

  if (referenceId) {
    const userExist = await UsersModel.findOne({ _id: referenceId });
    if (!userExist) {
      return res
        .status(409)
        .json(
          useErrorResponse(
            "No User exist with this Reference Id",
            res.statusCode
          )
        );
    }
  }

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
  const userId = req.user._id;
  const { companyId } = await AdminModel.findOne({
    userId: mongoose.Types.ObjectId(userId),
  });

  const roleIs = await RoleModel.findOne({ role });

  // Create new user

  const user = await UsersModel.create({
    fullName,
    contact,
    email,
    password,
    role: roleIs._id,
  });

  const employeeIdCount = (await EmployeeModel.find().count()) + 1;
  const employee = await EmployeeModel.create({
    joiningDate,
    employeeId: employeeIdCount,
    userId: mongoose.Types.ObjectId(user._id),
    designation,
    workingDay,
    basicPay,
    gender,
    companyId: companyId,
    image,
  });

  if (referenceId) {
    await EmployeeModel.updateOne({ _id: employee._id }, { referenceId });
  }

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
    // referenceId: employee.referenceId,
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
  const page = parseInt(req.query.page) || 1; // default to 1 if no query param is provided
  const pageSize = parseInt(req.query.pageSize) || 8; // default to 10 if no query param is provided
  const { search } = req.query;

  const employees = await UsersModel.aggregate([
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "userId",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "referenceId",
              foreignField: "_id",
              pipeline: [
                {
                  $project: {
                    password: 0,
                    role: 0,
                  },
                },
              ],
              as: "referenceDetails",
            },
          },
          {
            $project: {
              password: 0,
              role: 0,
            },
          },
        ],
        as: "employeesData",
      },
    },
    {
      $match: search
        ? {
            fullName: { $regex: `^${search}`, $options: "i" },
            "employeesData.0": { $exists: true },
          }
        : { "employeesData.0": { $exists: true } },
    },
    {
      $project: {
        password: 0,
        role: 0,
      },
    },
    {
      $facet: {
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
        count: [
          {
            $group: {
              _id: null,
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              count: 1,
            },
          },
        ],
      },
    },
  ]);

  const totalPages = Math.ceil(employees[0]?.count[0]?.count || 0 / pageSize);

  res.status(200).json({
    employees,
    totalNumberOfRecords: employees[0]?.count[0]?.count || 0,
    totalPages,
    page,
  });
});

// Request: GET
// Route: GET /api/employees/allemployees
// Access: Private
export const getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await EmployeeModel.find().populate("userId");

  res.status(200).json(employees);
});

// Request: GET
// Route: GET /api/employees/get/;employeeId
// Access: Private
export const getSingleEmployees = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const employee = await EmployeeModel.find({ userId: id }).populate("userId");

  res.status(200).json(success("Get employee profile", employee));
});

// Request: GET
// Route: GET /api/employees/updateEmployee/employeeId
// Access: Private
export const updateEmployee = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { userDetail, employeeDetail } = req.body;

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

// Request: GET
// Route: GET /api/v1/employees/profile/:employeeId
// Access: Public
// export const getProfile = asyncHandler(async (req, res) => {
//   const { employeeId } = req.params;

//   const employee = await EmployeeModel.findById({ _id: employeeId }).populate({
//     path: "userId",
//     select: "-password",
//   });

//   res.status(200).json(success("Get employee profile ", employee));
// });

// Request: DELETE
// Route: Delete /api/v1/employees/delete/:employeeId
// Access: Public
export const deleteEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const deleteUser = await UsersModel.findByIdAndDelete({
      _id: employeeId,
    });

    const deleteRespectiveEmployee = await EmployeeModel.findOneAndDelete({
      userId: employeeId,
    });

    if (!deleteUser) {
      return res.status(404).json(useErrorResponse("Employee does not exist"));
    }

    return res
      .status(200)
      .json(success("Employee deleted Successfully", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
