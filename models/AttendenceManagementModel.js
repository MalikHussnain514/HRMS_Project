import mongoose from "mongoose";

const attendenceManagementSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  date: {
    type: String,
  },
  inTime: {
    type: String,
  },
  outTime: {
    type: String,
  },
  //   status: {
  //     type: String,
  //     default: "pending",
  //   },
});

const AttendenceManagementModel = mongoose.model(
  "attendenceManagement",
  attendenceManagementSchema
);

export default AttendenceManagementModel;
