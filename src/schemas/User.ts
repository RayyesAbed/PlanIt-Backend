import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    toBeConfirmedEmail: {
      type: String,
    },
    confirmedEmail: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  {
    strict: true,
  }
);
export default mongoose.model("User", UserSchema);
