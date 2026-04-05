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
};

export default resolvers;
