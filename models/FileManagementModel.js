import mongoose from "mongoose";

const fileManagementSchema = new mongoose.Schema({
  employeeName: { type: String },

  caption: {
    type: String,
  },
  chooseFile: {
    type: String,
  },
  publicationStatus: {
    type: String,
  },
  expenseDate: {
    type: String,
  },
});

const FileManagementModel = mongoose.model(
  "fileManagement",
  fileManagementSchema
);

export default FileManagementModel;
