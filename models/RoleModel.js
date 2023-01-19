import mongoose from "mongoose";
import { roles } from '../utils/enums.js'
const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
    enum: Object.values(roles),
  },
  isActive: {
    type: Boolean,
  },
});

const RoleModel = mongoose.model("role", roleSchema);

export default RoleModel;