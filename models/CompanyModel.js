import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  companyName: {
    type: String,
    // required: [true, "full Name is required"],
    // trim: true,
  },
  employeeStrength: {
    type: Number,
  },
});

const CompanyModel = mongoose.model("company", companySchema);

export default CompanyModel;