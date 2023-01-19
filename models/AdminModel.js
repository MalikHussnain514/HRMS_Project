import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "company", required: true},

  // companyName: {
  //   type: String,
  //   // required: [true, "full Name is required"],
  //   // trim: true,
  // },
  // owner: {
  //   type: String,
  //   // required: [true, "Gender is required"],
  // },
  // email: {
  //   type: String,
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "Please fill a valid email address",
  //   ],
  //   unique: true,
  // },
  // contact: {
  //   type: String,
  //   // required: [true, "Contact Number is required"],
  //   trim: true,
  // },
  // password: {
  //   type: String,
  //   required: [true, "Password is required"],
  //   minlength: [6, "Password Digits must be 6"],
  // },
  // employeeStrength: {
  //   type: Number,
  // },
  // cnicNo: {
  //   type: String,
  // },
  // code: {
  //   type: String,
  //   // unique: [true, "Code must be unique"],
  // },
  // image: {
  //   type: String,
  // },
  // // Salon ID (F.K)
  // salonId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "salon",
  //   required: [true, "Salon Id is required"],
  // },
  // // Salon Branch ID (F.K)
  // branchId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "branch",
  //   // required: [true, "Salon Branch Id is required"],
  // },
  // role: {
  //   type: String,
  //   enum: ["SalonAdmin", "BranchAdmin", "Client", "Beautician", "SuperAdmin"],
  //   required: [true, "User Role is required"],
  //   // default: "Admin",
  // },
  // isActive: {
  //   type: Boolean,
  //   required: [true, "Active is required"],
  //   default: true,
  // },
  // resetPasswordOtp: String,
  // resetPasswordOtpExpiry: String,
  // otpStatus: {
  //   type: String,
  //   default: false,
  // },
});

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.methods.getVerifyToken = async function () {
//   const verifyToken = crypto.randomBytes(20).toString("hex");

//   this.emailVerifyToken = crypto
//     .createHash("sha256")
//     .update(verifyToken)
//     .digest("hex");

//   this.emailVerifyExpiry = Date.now() + 10 * 60 * 1000;

//   return verifyToken;
// };

// userSchema.methods.getResetPassword = async function () {
//   let resetPassword = Math.floor(1000 + Math.random() * 9000).toString();

//   // const resetPassword = "1122";

//   this.resetPasswordOtp = crypto
//     .createHash("sha256")
//     .update(resetPassword)
//     .digest("hex");

//   this.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

//   return resetPassword;
// };

const AdminModel = mongoose.model("admin", adminSchema);

export default AdminModel;
