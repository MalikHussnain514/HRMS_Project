import mongoose from "mongoose";

const overtimeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  overtimeDate: {
    type: Date,
  },
  designation: {
    type: String,
  },
  overtimeHours: {
    type: String,
  },
  overtimeAmount: {
    type: String,
  },
});

const OvertimeModel = mongoose.model("overtime", overtimeSchema);

export default OvertimeModel;
