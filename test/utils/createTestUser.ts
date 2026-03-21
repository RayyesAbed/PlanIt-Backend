import IUser from "../../src/interfaces/IUser";
import User from "../../src/schemas/User";
import mongoose from "mongoose";
import * as argon2 from "argon2";

const createTestUser = async (): Promise<IUser> => {
  const fakePassword = await argon2.hash("test123Test456!");

  return (await User.create({
    _id: new mongoose.Types.ObjectId(),
    name: "Fake",
    confirmedEmail: "fakelogin@fake.com",
    password: fakePassword,
    preferredLanguage: "en",
    currency: "$",
    subscription: new mongoose.Types.ObjectId(),
  })) as IUser;
};

export default createTestUser;
