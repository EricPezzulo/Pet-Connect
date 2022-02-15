import {
  booleanArg,
  extendType,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from "nexus";
import { User } from "./User";

export const Animal = objectType({
  name: "Animal",
  definition(t) {
    t.string("id"),
      t.string("species"),
      t.string("name"),
      t.string("dob"),
      t.string("breed"),
      t.string("color"),
      t.string("gender"),
      t.string("weight"),
      t.boolean("childFriendly"),
      t.boolean("dogFriendly"),
      t.boolean("catFriendly"),
      t.boolean("vaccinationsUptoDate"),
      t.string("description"),
      t.string("additionalInfo"),
      t.string("imageUrl"),
      t.list.field("favoritedBy", {
        type: User,
        async resolve(parent: any, _args: any, context: any) {
          return await context.prisma.animal
            .findUnique({
              where: {
                id: parent.id,
              },
            })
            .favoritedBy();
        },
      });
  },
});

export const FetchAllAnimals = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("fetchAllAnimals", {
      type: "Animal",
      async resolve(_root: any, _args: any, context: any) {
        return await context.prisma.animal.findMany();
      },
    });
  },
});

export const FetchAnimal = extendType({
  type: "Query",
  definition(t: any) {
    t.nonNull.list.field("fetchAnimal", {
      type: "Animal",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        return await context.prisma.animal.findMany({
          where: { id: args.id },
        });
      },
    });
  },
});

export const FetchBySpecies = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("fetchBySpecies", {
      type: "Animal",
      args: {
        species: nonNull(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        return await context.prisma.animal.findMany({
          where: {
            species: args.species,
          },
        });
      },
    });
  },
});

export const CreateNewAnimalListing = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createNewAnimalListing", {
      type: "Animal",
      args: {
        name: nonNull(stringArg()),
        dob: nonNull(stringArg()),
        weight: nonNull(stringArg()),
        color: nonNull(stringArg()),
        gender: nonNull(stringArg()),
        breed: nonNull(stringArg()),
        species: nonNull(stringArg()),
        childFriendly: nonNull(booleanArg()),
        dogFriendly: nonNull(booleanArg()),
        catFriendly: nonNull(booleanArg()),
        vaccinationsUptoDate: nonNull(booleanArg()),
        description: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        additionalInfo: nullable(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        const newAnimal = {
          name: args.name,
          dob: args.dob,
          weight: args.weight,
          color: args.color,
          breed: args.breed,
          gender: args.gender,
          species: args.species,
          childFriendly: args.childFriendly,
          dogFriendly: args.dogFriendly,
          catFriendly: args.catFriendly,
          vaccinationsUptoDate: args.vaccinationsUptoDate,
          description: args.description,
          imageUrl: args.imageUrl,
          additionalInfo: args.additionalInfo,
        };
        return await context.prisma.animal.create({ data: newAnimal });
      },
    });
  },
});

export const DeleteAnimal = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteAnimal", {
      type: "Animal",
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_root: any, args: any, context: any) {
        return await context.prisma.animal.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});
