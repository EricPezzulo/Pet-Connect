import { extendType, objectType, nonNull, stringArg } from "nexus";
import { Animal } from "./Animal";

export const User = objectType({
  name: "User",
  definition(t: any) {
    t.string("id"),
      t.string("name"),
      t.string("image"),
      t.string("email"),
      t.list.field("favoriteAnimals", {
        type: Animal,
        async resolve(parent: any, _args: any, context: any) {
          return await context.prisma.user
            .findUnique({
              where: {
                id: parent.id,
              },
            })
            .favoriteAnimals();
        },
      });
  },
});

export const FetchAllUsers = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("fetchAllUsers", {
      type: "User",
      async resolve(_root: any, _args: any, context: any) {
        return await context.prisma.user.findMany();
      },
    });
  },
});

export const FetchUser = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("fetchUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        return await context.prisma.user.findMany({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const UserFavorites = extendType({
  type: "Query",
  definition(t: any) {
    t.list.field("favoriteAnimals", {
      type: "Animal",
      args: {
        email: nonNull(stringArg()),
      },
      async resolve(_root: any, _args: any, context: any) {
        const user = await context.prisma.user.findUnique({
          where: {
            email: _args.email,
          },
          include: {
            favoriteAnimals: true,
          },
        });
        if (!user) throw new Error("invalid user");
        return user.favoriteAnimals;
      },
    });
  },
});

export const AddToFavorites = extendType({
  type: "Mutation",
  definition(t: any) {
    t.field("addToFavorites", {
      type: "Animal",
      args: {
        id: stringArg(),
        email: stringArg(),
      },
      async resolve(_: any, args: any, context: any) {
        const animal = await context.prisma.animal.findUnique({
          where: { id: args.id },
        });

        await context.prisma.user.update({
          where: {
            email: args.email,
          },
          data: {
            favoriteAnimals: {
              connect: {
                id: animal.id,
              },
            },
          },
        });
        return animal;
      },
    });
  },
});

// export const DeleteFromFavorites = extendType({
//   type: "Mutation",
//   definition(t: any) {
//     t.field("deleteFromFavorites", {
//       type: "Animal",
//       args: {
//         id: nonNull(stringArg()),
//         email: nonNull(stringArg()),
//       },
//       async resolve(_: any, args: any, context: any) {
//         const animal = await context.prisma.animal.findUnique({
//           where: { id: args.id },
//         });

//         await context.prisma.user.delete({
//           where: {
//             email: args.email,
//           },
//           data: {
//             favoriteAnimals: {
//               connect: {
//                 id: animal.id,
//               },
//             },
//           },
//         });
//         return animal;
//       },
//     });
//   },
// });
