import mongoose from "mongoose";

const referenceSchema = new mongoose.Schema({
  joiningDate: {
    type: String,
  },
  gender: {
    type: String,
    // required: [true, "Contact Number is required"],
    trim: true,
  },
  fullName: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    unique: true,
  },
  designation: {
    type: String,
  },
  referenceId: {
    type: Number,
  },
});

const ReferenceModel = mongoose.model("reference", referenceSchema);

export default ReferenceModel;
