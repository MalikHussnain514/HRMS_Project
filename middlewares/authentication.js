import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Models
import UserModel from "../models/UsersModel.js";
import { spaceRemoving } from "../utils/removeSpacing.js";
import { useErrorResponse } from "../utils/apiResponse.js";
import { roles } from "../utils/enums.js";

dotenv.config();

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = await jwt.verify(token, process.env.jwt_secret);

      req.user = await UserModel.findById(decodedToken.id).populate("role");
      next();
    } catch (error) {
      return res.status(498).json(useErrorResponse("Invalid Token", 498));
    }
  }

  if (!token) {
    return res.status(401).json(useErrorResponse("Token not found", 401));
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  // find role id of 'Admin'
  if (!req.user || !req.user.role) {
    return res.status(401).json(useErrorResponse("Role Not Found", 401));
  }

  if (!req.user.role.role) {
    return res.status(401).json(useErrorResponse("Role Not Found", 401));
  }

  if (
    ![roles.SUPER_ADMIN, roles.ADMIN, roles.HR].includes(req.user.role.role)
  ) {
    return res.status(401).json(useErrorResponse("Not Authorized", 401));
  }
  next();
});

export const isAdminOrManager = asyncHandler(async (req, res, next) => {
  // find role id of 'Admin'
  if (!req.user || !req.user.role) {
    return res.status(401).json(useErrorResponse("Role Not Found", 401));
  }

  if (!req.user.role.role) {
    return res.status(401).json(useErrorResponse("Role Not Found", 401));
  }

  if (
    ![roles.SUPER_ADMIN, roles.ADMIN, roles.HR, roles.MANAGER].includes(
      req.user.role.role
    )
  ) {
    return res.status(401).json(useErrorResponse("Not Authorized", 401));
  }
  next();
});

// export const SuperAdminAuthentication = asyncHandler(async (req, res, next) => {
//   let { contact } = req.query;

//   contact = contact && spaceRemoving(contact);

//   const user = await UserModel.findOne({ contactNumber: contact });

//   if (user?.role !== "SuperAdmin") {
//     throw new Error("Alert! You have no role to access this system");
//   }

//   next();
// });
