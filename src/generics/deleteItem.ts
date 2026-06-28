import { Model } from "mongoose";
import IDocument from "../types/IDocument";
import { ContextValue } from "../types/graphqlTypes";

const deleteItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: ContextValue | null,
  itemDTO: any,
) => {
  const userItem = await model.findOne({ userId: contextValue?.user._id });

  const userTaskIndex =
    userItem?.list.findIndex(
      (item) => String(item._id) == String(itemDTO._id),
    ) ?? -1;

  if (userTaskIndex == -1) {
    throw new Error("Unable to remove item");
  }

  userItem?.list.splice(userTaskIndex, 1);

  await userItem?.save();

  return itemDTO;
};

export default deleteItem;
