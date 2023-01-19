import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Models
import UserModel from "../models/UsersModel.js";
import { spaceRemoving } from "../utils/removeSpacing.js";

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
      // console.log('decoded token', decodedToken.id)
      
      req.user = await UserModel.findById(decodedToken.id);
      console.log('request.user', req.user)
      next();
    } catch (error) {
      res.status(400);
      throw new Error("Invalid Token");
    }
  }

  if (!token) {
    res.status(400);
    throw new Error("Token not found");
  }
});

export const AdminAuthentication = asyncHandler(async (req, res, next) => {
  const { contactNumber } = req.body;

  const contact = contactNumber && spaceRemoving(contactNumber);

  const user = await UserModel.findOne({ contactNumber: contact });

  if (user.role === "Client" || user.role === "Beautician") {
    throw new Error("Alert! Unauthorized User to this system.");
  }

  next();
});

export const SuperAdminAuthentication = asyncHandler(async (req, res, next) => {
  let { contact } = req.query;

  contact = contact && spaceRemoving(contact);

  const user = await UserModel.findOne({ contactNumber: contact });

  if (user?.role !== "SuperAdmin") {
    throw new Error("Alert! You have no role to access this system");
  }

  next();
});
