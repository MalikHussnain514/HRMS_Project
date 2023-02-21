import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },

  joiningDate: {
    type: String,
  },
  employeeId: {
    type: Number,
  },
  designation: {
    type: String,
  },
  workingDay: {
    type: [String],
  },
  basicPay: {
    type: String,
  },
  gender: {
    type: String,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

export default EmployeeModel;
