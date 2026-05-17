import { Model } from "mongoose";
import IDocument from "../types/IDocument";

const addItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: any,
  itemDTO: any,
) => {
  const userItem = await model.findOne({ userId: contextValue.user._id });

  userItem?.list.push(itemDTO);

  await userItem?.save();

  return itemDTO;
};

export default addItem;
