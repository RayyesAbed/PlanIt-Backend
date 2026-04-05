import toTaskDTO from "../../features/tasks/taskDTOMappers";
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
      const userTask = await Task.findOne({ userId: contextValue.user._id });

      const taskDTO = toTaskDTO(args);

      userTask?.list.push(taskDTO);

      await userTask?.save();

      return args.input;
    },
  },
};

export default resolvers;
