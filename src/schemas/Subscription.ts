import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  features: [String],
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Subscription", SubscriptionSchema);
