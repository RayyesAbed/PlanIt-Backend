import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import Subscription from "../src/schemas/Subscription";
import User from "../src/schemas/User";

dotenv.config({ path: ".env.development" });

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await Subscription.create({
    _id: new mongoose.Types.ObjectId("64a000000000000000000001"),
    name: "Free",
    price: 0,
    currency: "EUR",
  });

  await User.create({
    _id: new mongoose.Types.ObjectId(),
    name: "Fake",
    confirmedEmail: "fakelogin@fake.com",
    password: "test123Test456!",
    preferredLanguage: "en",
    currency: "$",
    subscription: new mongoose.Types.ObjectId(),
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
