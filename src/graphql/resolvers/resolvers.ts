const resolvers = {
  Query: {
    getUserData: (_: any, __: any, contextValue: any) => {
      return contextValue.user;
    },
  },
};

export default resolvers;
