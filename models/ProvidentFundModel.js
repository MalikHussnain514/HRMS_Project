import mongoose from "mongoose";

const providentFundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  subscriptionAmount: {
    type: String,
  },
  contributionAmount: {
    type: String,
  },
  loanDate: {
    type: String,
  },
});

const ProvidentFundModel = mongoose.model("providentFund", providentFundSchema);

export default ProvidentFundModel;
