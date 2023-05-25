import mongoose from "mongoose";

const leaveManagementSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employee",
    required: true,
  },
  approvingUserId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  leaveType: {
    type: String,
  },
  dateFrom: {
    type: String,
  },
  dateTo: {
    type: String,
  },
  leaveDay: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const LeaveManagementModel = mongoose.model(
  "leaveManagement",
  leaveManagementSchema
);

export default LeaveManagementModel;
