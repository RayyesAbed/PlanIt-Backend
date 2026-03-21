import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { beforeAll, afterAll } from "vitest";
import createTestUser from "./utils/createTestUser";
import createTestSubscription from "./utils/createTestSubscription";

dotenv.config({ path: ".env.development" });

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await createTestSubscription();

  await createTestUser();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
