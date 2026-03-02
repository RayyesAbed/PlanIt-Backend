import mongoose from "mongoose";
import FakeUser from "../../types/FakeUser";
import loadSecrets from "../../../../configs/loadSecrets";

const { FAKE_USER_EMAIL } = loadSecrets();

const fakeUserData: FakeUser = {
  _id: new mongoose.Types.ObjectId(),
  name: "Fake",
  confirmedEmail: FAKE_USER_EMAIL,
  preferredLanguage: "en",
};

export default fakeUserData;
