import { Model } from "mongoose";
import toTaskDTO from "../../features/tasks/taskDTOMappers";
import addItem from "../../generics/addItem";
import Task from "../../schemas/Task";
import editItem from "../../generics/editItem";
import deleteItem from "../../generics/deleteItem";
import { ContextValue } from "../../types/graphqlTypes";

const resolvers = {
  Query: {
    getUserData: (_: any, __: any, contextValue: ContextValue | null) => {
      return contextValue?.user;
    },
    getUserTasks: async (
      _: any,
      __: any,
      contextValue: ContextValue | null,
    ) => {
      const userTask = await Task.findOne({ userId: contextValue?.user._id });
      return userTask?.list;
    },
  },
  Mutation: {
    addTask: async (_: any, args: any, contextValue: ContextValue | null) => {
      const taskDTO = toTaskDTO(args);

      await addItem(Task as Model<any>, contextValue, taskDTO);

      return args.input;
    },
    editTask: async (_: any, args: any, contextValue: ContextValue | null) => {
      const taskDTO = toTaskDTO(args);

      await editItem(Task as Model<any>, contextValue, taskDTO);

      return args.input;
    },
    deleteTask: async (
      _: any,
      args: any,
      contextValue: ContextValue | null,
    ) => {
      const taskDTO = toTaskDTO(args);

      await deleteItem(Task as Model<any>, contextValue, taskDTO);

      return args.input;
    },
  },
};

export default resolvers;
