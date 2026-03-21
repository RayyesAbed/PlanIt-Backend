import Subscription from "../../src/schemas/Subscription";
import mongoose from "mongoose";

const createTestSubscription = async () => {
  await Subscription.create({
    _id: new mongoose.Types.ObjectId("64a000000000000000000001"),
    name: "Free",
    price: 0,
    currency: "EUR",
  });
};

export default createTestSubscription;
