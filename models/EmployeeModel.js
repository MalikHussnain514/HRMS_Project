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
  // email: {
  //   type: String,
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "Please fill a valid email address",
  //   ],
  //   unique: true,
  // },
  // fullName: {
  //   type: String,
  // },
  // contact: {
  //   type: String,
  // },
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
  addReference: {
    type: [String],
  },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

export default EmployeeModel;