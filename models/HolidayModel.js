import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  holidayDate: {
    type: String,
  },
  description: {
    type: String,
  },
});

const HolidayModel = mongoose.model("holiday", holidaySchema);

export default HolidayModel;
