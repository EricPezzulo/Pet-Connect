export const resolvers = {
  Query: {
    animals: (_parent: any, _args: any, context: any) => {
      return context.prisma.animal.findMany();
    },
  },
};
