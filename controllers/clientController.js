import asyncHandler from "express-async-handler";

// Models
import ClientModel from "../models/ClientModel.js";


// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/client/login/:branchId
// Access: Public

// export const loginClient = asyncHandler(async (req, res) => {
//   const { branchId } = req.params;
//   const { contactNumber, password } = req.body;

//   const contact = contactNumber && spaceRemoving(contactNumber);

//   const user = await UserModel.findOne({
//     contactNumber: contact,
//     role: "Client",
//   });

//   if (!user) {
//     return res
//       .status(404)
//       .json(useErrorResponse("phone number or password is invalid"));
//   }

//   const isMatched = await user.matchPassword(password);

//   if (!isMatched) {
//     return res
//       .status(404)
//       .json(useErrorResponse("phone number or password is invalid"));
//   }

//   if (!contactNumber || !password) {
//     return res
//       .status(500)
//       .json(useErrorResponse("Please enter email and password"));
//   }

//   if (branchId != user.branchId) {
//     return res
//       .status(409)
//       .json(useErrorResponse("WARNING! You have no user in this branch."));
//   }

//   const data = {
//     id: user._id,
//     fullName: user.fullName,
//     contactNumber: user.contactNumber,
//     fullName: user.fullName,
//     email: user.email,
//     userRole: user.role,
//     salonId: user.salonId,
//     branchId: user.branchId,
//     token: generateWebToken(user._id),
//   };

//   if (user && isMatched) {
//     res
//       .status(200)
//       .json(success("User loggedIn successfully", data, res.statusCode));
//   }
// });

// Request: POST
// Route: POST /api/v1/client/create
// Access: Public

export const createClient = asyncHandler(async (req, res, next) => {
  const {
    joiningDate,
    gender,
    fullName,
    contact,
    email,
    clientType,
  } = req.body;

  // space removing
  // const contactNumber = contactNumber && spaceRemoving(contact);

  if (contact.length !== 11) {
    return res
      .status(400)
      .json(useErrorResponse("Contact Number length must be 11 digits"));
  }



  // Check if client contactNumber is exist or not
  const isExists = await ClientModel.findOne({
    contactNumber: contact,
  });

  if (isExists) {
    return res
      .status(409)
      .json(
        useErrorResponse(
          "Client Already exist with this phone number",
          res.statusCode
        )
      );
  }

  // Create new client
  const user = await UserModel.create({
    fullName,
    gender,
    bio,
    contactNumber: contact,
    email,
    password: password ? password : "123456",
    role: role === "Client" ? role : "Client",
    branchId,
    salonId,
  });

  console.log("user :- ", user);

  const data = {
    id: user._id,
    fullName: user.fullName,
    contactNumber: user.contactNumber,
    email: user.email,
    role: user.role,
    gender: user.gender,
    bio: user.bio,
  };

  if (user) {
    res.status(200).json(success("Client Registered Successfully", data));
  }
});

// Request: GET
// Route: GET /api/v1/client/all
// Access: Public

// export const getAllClient = asyncHandler(async (req, res) => {
//   const { branchId } = req.params;
//   // for search functionality & isActive: true or false
//   const { search, isActive } = req.query;

//   const keyword = search
//     ? {
//         fullName: { $regex: search, $options: "i" },
//       }
//     : {};

//   const status = isActive ? { isActive: isActive } : {};

//   const allClients = await UserModel.find(
//     {
//       branchId: branchId,
//       role: "Client",
//       ...keyword,
//       ...status,
//     },
//     {
//       password: 0,
//       branchId: 0,
//       salonId: 0,
//       otpStatus: 0,
//     }
//   );

//   if (!allClients) {
//     return res.status(200).json(success("No client available", allClients));
//   }

//   res
//     .status(200)
//     .json(success("Client get Successfully", allClients, res.statusCode));
// });

// Request: PUT
// Route: PUT /api/v1/client/update
// Access: Public

// export const updateClient = asyncHandler(async (req, res) => {
//   const { clientId } = req.params;
//   const { fullName, contactNumber, email, gender, bio, isActive } = req.body;

//   // find client
//   const isClient = await UserModel.findById({ _id: clientId });

//   if (!isClient) {
//     return res
//       .status(404)
//       .json(useErrorResponse("Client Not found", res.statusCode));
//   }

//   // space removing
//   const contact = contactNumber && spaceRemoving(contactNumber);

//   // only find the new contactNumber before updation if old contactNumber then no need to check
//   if (isClient.contactNumber !== contact) {
//     // Check if client contactNumber is exist or not
//     const isExists = await UserModel.findOne({ contactNumber: contact });

//     if (isExists) {
//       return res
//         .status(409)
//         .json(
//           useErrorResponse(
//             "Client Already exist with this phone number",
//             res.statusCode
//           )
//         );
//     }
//   }

//   isClient.fullName = fullName || isClient.fullName;
//   isClient.contactNumber = contact || isClient.contactNumber;
//   isClient.email = email || isClient.email;
//   isClient.gender = gender || isClient.gender;
//   isClient.bio = bio || isClient.bio;

//   if (isActive === true || isActive === false) {
//     isClient.isActive = isActive;
//   } else {
//     isClient.isActive = isClient.isActive;
//   }

//   isClient.save({ validationBeforeSave: false });

//   if (isClient) {
//     res.status(200).json(success("Client updated Successfully"));
//   }
// });
