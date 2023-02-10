import mongoose from "mongoose";

const incrementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  incrementDate: {
    type: String,
  },
  incrementAmount: {
    type: String,
  },
  incrementPurpose: {
    type: String,
  },
});

const IncrementModel = mongoose.model("increment", incrementSchema);

export default IncrementModel;
