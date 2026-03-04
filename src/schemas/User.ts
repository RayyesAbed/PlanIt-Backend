import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      enum: ["local", "google", "apple"],
      default: "local",
      required: true,
    },
    providerId: {
      type: String,
    },
    picture: {
      type: String,
      default: null,
    },
    toBeConfirmedEmail: {
      type: String,
    },
    confirmedEmail: {
      type: String,
    },
    password: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    preferredLanguage: {
      type: String,
      required: true,
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
  },
);
export default mongoose.model("User", UserSchema);
