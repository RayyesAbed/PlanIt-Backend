import { Model } from "mongoose";
import toTaskDTO from "../../features/tasks/taskDTOMappers";
import addItem from "../../generics/addItem";
import Task from "../../schemas/Task";
import User from "../../schemas/User";
import editItem from "../../generics/editItem";
import deleteItem from "../../generics/deleteItem";
import { ContextValue } from "../../types/graphqlTypes";
import handleTaskPoints from "../../features/tasks/utils/handleTaskPoints";

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

      handleTaskPoints(taskDTO);

      await addItem(Task as Model<any>, contextValue, taskDTO);

      return args.input;
    },
    editTask: async (_: any, args: any, contextValue: ContextValue | null) => {
      const taskDTO = toTaskDTO(args);

      handleTaskPoints(taskDTO);

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
    completeTask: async (
      _: any,
      args: any,
      contextValue: ContextValue | null,
    ) => {
      const taskDTO = toTaskDTO(args);

      if (taskDTO.isDue) return;

      if (taskDTO.isCompleted) return;

      const userId = contextValue?.user?._id;

      handleTaskPoints(taskDTO);

      const result = await Task.updateOne(
        {
          userId,
          list: {
            $elemMatch: {
              _id: taskDTO._id,
              isCompleted: false,
            },
          },
        },
        {
          $set: {
            "list.$.isCompleted": true,
          },
        },
      );

      if (result.modifiedCount === 0) return;

      await User.updateOne(
        { _id: userId },
        {
          $inc: {
            points: taskDTO.points,
          },
        },
      );
    },
  },
};

export default resolvers;
