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
    birthDate: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
export default mongoose.model("User", UserSchema);
