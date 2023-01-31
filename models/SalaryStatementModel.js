import mongoose from "mongoose";

const salaryStatementSchema = new mongoose.Schema({
  salaryStatementDate: { 
    type: String,
  },
  basicSalary: {
    type: String,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  employeeType: {
    type: String,
  },
  designation: {
    type: String,
  },
  providentFund: {
    type: String,
  },
  grossSalary: {
    type: String,
  },
});

const SalaryStatementModel = mongoose.model("salaryStatement", salaryStatementSchema);

export default SalaryStatementModel;
