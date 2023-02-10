import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";
import crypto from "crypto";
import { roles } from "../utils/enums.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import https from "https";
import mongoose from "mongoose";

dotenv.config();

// Import model
import AdminModel from "../models/AdminModel.js";
import UsersModel from "../models/UsersModel.js";
import CompanyModel from "../models/CompanyModel.js";
import RoleModel from "../models/RoleModel.js";

// Utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
import { spaceRemoving } from "../utils/removeSpacing.js";
import EmployeeModel from "../models/EmployeeModel.js";

// for SMS sending
// import twilio from "twilio";

// Twillio Account Sid and Auth Token
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

// E ocean
// const URL = process.env.EOCEAN_URL;
// const USER = process.env.EOCEAN_USER;
// const PASSWORD = process.env.EOCEAN_PASSWORD;
// const SENDER = process.env.EOCEAN_SENDER;
// const TYPE = "json";

// Request: POST
// Route: POST /api/v1/users/register
// Access: Public
export const adminRegister = asyncHandler(async (req, res) => {
  const { companyName, fullName, email, contact, password, employeeStrength } =
    req.body;

  // Check if admin is exist

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

  const roleId = await RoleModel.findOne({ role: roles.ADMIN });

  // Create new admin

  const user = await UsersModel.create({
    contact,
    email,
    fullName,
    password,
    role: roleId._id,
  });
  const company = await CompanyModel.create({
    companyName,
    employeeStrength,
  });

  const admin = await AdminModel.create({
    userId: user._id,
    companyId: company._id,
  });

  const data = {
    _id: user._id,
    companyName: company.companyName,
    fullName: user.fullName,
    email: user.email,
    contact: user.contact,
    employeeStrength: company.employeeStrength,
    token: generateWebToken(user._id),
  };

  if (user && company && admin) {
    res
      .status(201)
      .json(success("admin Registered Successfully", data, res.statusCode));
  } else {
    res
      .status(500)
      .json(useErrorResponse("Something went wrong", res.statusCode));
  }
});

// Request: PUT
// Route: PUT /api/users/emailverify/:verifytoken
// Access: Public

// export const verifyUser = asyncHandler(async (req, res) => {
//   const emailVerifyToken = crypto
//     .createHash("sha256")
//     .update(req.params.verifytoken)
//     .digest("hex");

//   const user = await UserModel.findOne({
//     emailVerifyToken,
//     emailVerifyExpiry: { $gt: Date.now() },
//   });

//   if (user.verify) {
//     res.status(400);
//     throw new Error("User Already Verify");
//   }

//   if (!user) {
//     res.status(500);
//     throw new Error("Email Not Verify");
//   }

//   user.verify = true;
//   user.emailVerifyToken = undefined;
//   user.emailVerifyExpiry = undefined;

//   user.save();

//   res.status(202).json({
//     message: "User verified",
//     token: generateWebToken(user._id),
//   });
// });

// Request: POST
// Route: POST /api/users/login
// Access: Public
export const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json(
        useErrorResponse("Please enter email and password", res.statusCode)
      );
  }

  const admin = await UsersModel.findOne({ email });

  if (!admin) {
    return res
      .status(422)
      .json(useErrorResponse("No admin found", res.statusCode));
  }

  const isMatched = await admin.matchPassword(password);

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
    id: admin._id,
    fullName: admin.fullName,
    email: admin.email,
    contact: admin.contact,
    token: generateWebToken(admin._id),
  };

  if (admin && isMatched) {
    res
      .status(200)
      .json(
        success(
          `admin ${admin.fullName} loggedIn successfully`,
          data,
          res.statusCode
        )
      );
  }
});

// Request: POST
// Route: POST /api/v1/users/forgotpassword
// Access: Public

// export const forgotPassword = asyncHandler(async (req, res) => {
//   const { contactNumber } = req.body;

//   const contact = spaceRemoving(contactNumber);

//   const user = await UserModel.findOne({ contactNumber: contact });

//   if (!user) {
//     res.status(400);
//     throw new Error("User Does not Exists");
//   }

//   if (user) {
//     const resetPasswordOtp = await user.getResetPassword();

//     user.save({ validateBeforeSave: false });

//     const message = `Your reset password: ${resetPasswordOtp}`;

//     var send_sms_url =
//       URL +
//       "?user=" +
//       USER +
//       "&pwd=" +
//       PASSWORD +
//       "&sender=" +
//       SENDER +
//       "&reciever=" +
//       contact +
//       "&msg-data=" +
//       message +
//       "&response=" +
//       TYPE;

//     const sms_response = https.get(send_sms_url);
//     if (sms_response) {
//       res.status(200).json(success("SMS send successfully"));
//     }

//     // Twilio Message send code
//     // try {
//     //   client.messages
//     //     .create({
//     //       body: message,
//     //       from: "+12298081992",
//     //       to: `+92${contactNumber}`,
//     //     })
//     //     .then((message) => console.log(message.sid));

//     //   const data = {
//     //     opt: resetPasswordOtp,
//     //   };
//     //   res
//     //     .status(200)
//     //     .json(success("Your password has been sent", data, res.statusCode));
//     // } catch (err) {
//     //   user.save({ validateBeforeSave: false });

//     //   res.status(400).send("Forgot Password could not sent");
//     // }
//   }
// });

// Request: POST
// Router: POST /api/v1/users/verifyotp
// Access: Public

// export const verifyOtp = asyncHandler(async (req, res, next) => {
//   // send the verifyOtp in req.body
//   const verifyOtp = crypto
//     .createHash("sha256")
//     .update(req.body.verifyOtp)
//     .digest("hex");

//   const otp = await UserModel.findOne({ resetPasswordOtp: verifyOtp });

//   if (!otp) {
//     throw new Error("Otp not verified", 401);
//   }

//   if (otp.resetPasswordOtpExpiry < Date.now()) {
//     throw new Error("OTP Expired", 401);
//   }

//   otp.resetPasswordOtp = undefined;
//   otp.resetPasswordOtpExpiry = undefined;
//   otp.otpStatus = true;
//   otp.save({ validateBeforeSave: false });

//   res.status(200).json(success("OTP verified Successfully"));
// });

// Request: GET
// Route: GET /api/users/allusers
// Access: Private
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await AdminModel.find({}).populate("userId");

  res.json(admins);
});

export const getCountOfEmployeeAndClient = asyncHandler(async (req, res) => {
  const admins = await AdminModel.find({}).populate("userId");
  const employees = await EmployeeModel.find({}).populate("userId");
  const test = await EmployeeModel.find().count();

  const totalAdmins = admins.length;
  const totalEmployees = employees.length;

  res.status(200).json({
    totalNumberOfAdmins: totalAdmins,
    totalNumberOfEmployees: totalEmployees,
    testMethod: test,
  });
});

// Request: PUT
// Route: PUT /api/v1/users/resetpassword
// Access: Public

// export const resetpassword = asyncHandler(async (req, res) => {
//   const { password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     res.status(400);
//     throw new Error("Password Must Matched");
//   }

//   const user = await UserModel.findOne({ otpStatus: true });

//   if (!user) {
//     res.status(400);
//     throw new Error("User Not Found");
//   }

//   user.password = password;
//   user.otpStatus = false;
//   user.save({ validateBeforeSave: false });

//   const data = {
//     token: generateWebToken(user._id),
//   };
//   res
//     .status(200)
//     .json(success("Password Reset Successfully", data, res.statusCode));
// });

// Request: GET
// Route: GET /api/v1/users/profile/:userId
// Access: Public

export const getProfile = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const admin = await AdminModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(adminId),
      },
    },
  ]);

  res.status(200).json(success("Get admin profile ", admin));
});

// Request: PUT
// Route: PUT /api/v1/users/profile/:userId
// Access: Public

// export const updateProfile = asyncHandler(async (req, res) => {
//   const { userId } = req.params;
//   const {
//     fullName,
//     email,
//     contactNumber,
//     password,
//     bio,
//     gender,
//     salonTitle,
//     address,
//   } = req.body;

//   // find user
//   const isUser = await UsersModel.findById({ _id: userId });

//   if (!isUser) {
//     throw new Error("User not found");
//   }

//   // if SalonTitle exists in request
//   if (salonTitle) {
//     // find the salon
//     const isSalon = await SalonModel.findById({ _id: isUser.salonId });

//     if (!isSalon) {
//       throw new Error("Salon not exists");
//     }

//     // if user enters new Salon Title
//     if (isSalon.salonTitle !== salonTitle) {
//       const findSalonTitle = await SalonModel.findOne({
//         salonTitle: salonTitle,
//       });

//       if (findSalonTitle) {
//         throw new Error("Salon already exists with this Title");
//       }
//     }

//     // then update the salonTitle
//     isSalon.salonTitle = salonTitle;

//     isSalon.save({ validationBeforeSave: false });
//   }

//   // if address exists in request
//   if (address) {
//     const isBranch = await BranchModel.findById({ _id: isUser.branchId });

//     if (!isBranch) {
//       throw new Error("Branch not exists");
//     }

//     isBranch.branchLocation = address || isBranch.branchLocation;

//     isBranch.save({ validationBeforeSave: false });
//   }

//   // space removing
//   const contact = contactNumber && spaceRemoving(contactNumber);

//   // if user wants to update the contact number then we go for it
//   if (contactNumber) {
//     // if enters new number
//     if (isUser.contactNumber !== contact) {
//       // checks new number exists or not
//       const isExists = await UserModel.findOne({ contactNumber: contact });

//       if (isExists) {
//         throw new Error("User Already exist with this phone number");
//       }
//     }
//   }

//   isUser.contactNumber = contact || isUser.contactNumber;
//   isUser.fullName = fullName || isUser.fullName;
//   isUser.email = email || isUser.email;
//   isUser.password = password || isUser.password;
//   isUser.bio = bio || isUser.bio;
//   isUser.gender = gender || isUser.gender;

//   isUser.save({ validationBeforeSave: false });

//   if (!isUser) {
//     throw new Error("Something went wrong with User");
//   }

//   res.status(202).json(success("Information updated Successfully"));
// });
