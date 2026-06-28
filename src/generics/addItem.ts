import { Model } from "mongoose";
import IDocument from "../types/IDocument";
import { ContextValue } from "../types/graphqlTypes";

const addItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: ContextValue | null,
  itemDTO: any,
) => {
  const userItem = await model.findOne({ userId: contextValue?.user._id });

  userItem?.list.push(itemDTO);

  await userItem?.save();

  return itemDTO;
};

export default addItem;
