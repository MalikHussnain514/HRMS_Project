import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import ReferenceModel from "../models/ReferenceModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/reference/create
// Access: Public

export const createReference = asyncHandler(async (req, res, next) => {
  const { joiningDate, gender, fullName, contact, email, designation, referenceId } =
    req.body;

  // space removing
  // const contactNumber = contactNumber && spaceRemoving(contact);

  if (contact.length !== 11) {
    return res
      .status(400)
      .json(useErrorResponse("Contact Number length must be 11 digits"));
  }

  // Check if client contactNumber is exist or not
  const isExists = await ReferenceModel.findOne({ contact });

  if (isExists) {
    return res
      .status(409)
      .json(
        useErrorResponse(
          "Reference Already exist with this phone number",
          res.statusCode
        )
      );
  }

  // Create new client
  const reference = await ReferenceModel.create({
    joiningDate,
    gender,
    fullName,
    contact,
    email,
    designation,
    referenceId,
  });

  const data = {
    id: reference._id,
    joiningDate: reference.joiningDate,
    gender: reference.gender,
    fullName: reference.fullName,
    contact: reference.contact,
    email: reference.email,
    email: reference.designation,
    email: reference.referenceId,
  };

  if (reference) {
    res.status(200).json(success("Reference Registered Successfully", data));
  }
});

// Request: GET
// Route: GET /api/v1/refernces/all
// Access: Public

export const getAllReferences = asyncHandler(async (req, res) => {
  const references = await ReferenceModel.find({});
  res
    .status(200)
    .json(success("Reference get Successfully", references, res.statusCode));
});

// Request: PUT
// Route: PUT /api/v1/reference/:id
// Access: Public

export const getReferenceById = asyncHandler(async (req, res) => {
  const { referenceId } = req.params;
  const reference = await ReferenceModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(referenceId),
      },
    },
  ]);

  res.status(200).json(success("Get reference profile ", reference));
});

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
