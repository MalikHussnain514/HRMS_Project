import mongoose from "mongoose";

const expenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  expenceDate: {
    type: Date,
  },
  expencePurpose: {
    type: String,
  },
  expenceAmount: {
    type: String,
  },
  chequeNo: {
    type: String,
  },
});

const ExpenceModel = mongoose.model("expence", expenceSchema);

export default ExpenceModel;
