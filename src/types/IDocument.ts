import { Document, ObjectId } from "mongoose";

interface IDocument<Type> extends Document {
  list: Type[];
  userId: ObjectId;
}

export default IDocument;
