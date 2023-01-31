import mongoose from "mongoose";

const bonusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  bonusName: {
    type: String,
  },
  designation: {
    type: String,
  },
  bonusAmount: {
    type: String,
  },
  bonusMonth: {
    type: String,
  },
});

const BonusModel = mongoose.model("bonus", bonusSchema);

export default BonusModel;
