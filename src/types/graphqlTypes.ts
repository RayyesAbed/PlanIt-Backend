import mongoose from "mongoose";

export type ContextValue = {
  user: {
    _id: mongoose.Types.ObjectId;
  };
};
