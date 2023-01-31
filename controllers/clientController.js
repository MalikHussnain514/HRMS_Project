import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Models
import ClientModel from "../models/ClientModel.js";

// utils
import { success, useErrorResponse } from "../utils/apiResponse.js";
// import { spaceRemoving } from "../utils/removeSpacing.js";
// import generateWebToken from "../utils/generateToken.js";

// Request: POST
// Route: POST /api/v1/client/create
// Access: Public

export const createClient = asyncHandler(async (req, res, next) => {
  const { joiningDate, gender, fullName, contact, email, clientType } =
    req.body;

  // space removing
  // const contactNumber = contactNumber && spaceRemoving(contact);

  if (contact.length !== 11) {
    return res
      .status(400)
      .json(useErrorResponse("Contact Number length must be 11 digits"));
  }

  // Check if client contactNumber is exist or not
  const isExists = await ClientModel.findOne({ contact });

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
  const client = await ClientModel.create({
    joiningDate,
    gender,
    fullName,
    contact,
    email,
    clientType,
  });

  const data = {
    id: client._id,
    joiningDate: client.joiningDate,
    gender: client.gender,
    fullName: client.fullName,
    contact: client.contact,
    email: client.email,
    clientType: client.clientType,
  };

  if (client) {
    res.status(200).json(success("Client Registered Successfully", data));
  }
});

// Request: GET
// Route: GET /api/v1/client/all
// Access: Public

export const getAllClients = asyncHandler(async (req, res) => {
  const clients = await ClientModel.find({});
  res
    .status(200)
    .json(success("Client get Successfully", clients, res.statusCode));
});

// Request: PUT
// Route: PUT /api/v1/client/update
// Access: Public

export const getClientById = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const client = await ClientModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(clientId),
      },
    },
  ]);

  res.status(200).json(success("Get client profile ", client));
});

// Request: PUT
// Route: PUT /api/v1/client/update
// Access: Public

export const updateClient = asyncHandler(async (req, res) => {
  const { clientId } = req.params;
  const { clientDetails } = req.body;

  const updatedClient = await ClientModel.updateOne(
    { _id: clientId },
    {
      $set: {
        ...clientDetails,
      },
    },
    { new: true }
  );

  // find client
  // const isClient = await UserModel.findById({ _id: clientId });

  // if (!isClient) {
  //   return res
  //     .status(404)
  //     .json(useErrorResponse("Client Not found", res.statusCode));
  // }

  // space removing
  // const contact = contactNumber && spaceRemoving(contactNumber);

  // only find the new contactNumber before updation if old contactNumber then no need to check
  // if (isClient.contactNumber !== contact) {
  //   // Check if client contactNumber is exist or not
  //   const isExists = await UserModel.findOne({ contactNumber: contact });

  //   if (isExists) {
      // return res
      //   .status(409)
      //   .json(
      //     useErrorResponse(
      //       "Client Already exist with this phone number",
      //       res.statusCode
      //     )
      //   );
  //   }
  // }

  // isClient.fullName = fullName || isClient.fullName;
  // isClient.contactNumber = contact || isClient.contactNumber;
  // isClient.email = email || isClient.email;
  // isClient.gender = gender || isClient.gender;
  // isClient.bio = bio || isClient.bio;

  // if (isActive === true || isActive === false) {
  //   isClient.isActive = isActive;
  // } else {
  //   isClient.isActive = isClient.isActive;
  // }

  // isClient.save({ validationBeforeSave: false });

  // if (isClient) {
  // }
  res.status(200).json(success("Client updated Successfully"));
});

// Request: DELETE
// Route: Delete /api/v1/client/delete/:id
// Access: Public
export const deleteClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const deleteClient = await ClientModel.findByIdAndDelete({ _id: clientId });

    if(!deleteClient){
      return res.status(404).json(useErrorResponse('Client does not exist'));
    }

    return res
      .status(200)
      .json(success("Client deleted Successfully", "", res.statusCode));
  } catch (error) {
    console.log("error", error);
  }
};
