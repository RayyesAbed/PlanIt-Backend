import { Model } from "mongoose";
import toTaskDTO from "../../features/tasks/taskDTOMappers";
import addItem from "../../generics/addItem";
import Task from "../../schemas/Task";

const resolvers = {
  Query: {
    getUserData: (_: any, __: any, contextValue: any) => {
      return contextValue.user;
    },
    getUserTasks: async (_: any, __: any, contextValue: any) => {
      const userTask = await Task.findOne({ userId: contextValue.user._id });
      return userTask?.list;
    },
  },
  Mutation: {
    addTask: async (_: any, args: any, contextValue: any) => {
      const taskDTO = toTaskDTO(args);

      await addItem(Task as Model<any>, contextValue, taskDTO);

      return args.input;
    },
  },
};

export default resolvers;
