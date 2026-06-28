import { Model } from "mongoose";
import IDocument from "../types/IDocument";
import { ContextValue } from "../types/graphqlTypes";

const editItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: ContextValue | null,
  itemDTO: any,
) => {
  await model.updateOne(
    {
      userId: contextValue?.user._id,
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
