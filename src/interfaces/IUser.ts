import { Document, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  toBeConfirmedEmail: string;
  confirmedEmail: string;
  password?: string;
  provider: "local" | "google" | "apple";
  providerId?: string;
  birthDate?: string;
  preferredLanguage: string;
  points: number;
  currency: string;
  subscription: any;
}

export default IUser;
