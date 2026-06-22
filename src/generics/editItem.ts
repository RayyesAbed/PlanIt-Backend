import { Model } from "mongoose";
import IDocument from "../types/IDocument";

const editItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: any,
  itemDTO: any,
) => {
  await model.updateOne(
    {
      userId: contextValue.user._id,
      "list._id": itemDTO._id,
    },
    {
      $set: {
        "list.$": itemDTO,
      },
    },
  );

  return itemDTO;
};

export default editItem;
