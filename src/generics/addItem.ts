import { Model } from "mongoose";
import IDocument from "../types/IDocument";

const addItem = async <Type extends IDocument<Type>>(
  model: Model<Type>,
  contextValue: any,
  itemDTO: any,
) => {};

export default addItem;
