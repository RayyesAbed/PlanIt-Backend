import { Types } from "mongoose";

type FakeUser = {
  _id: Types.ObjectId;
  name: string;
  toBeConfirmedEmail?: string | null;
  preferredLanguage: string;
};

export default FakeUser;
