import { PrismaClient } from "@prisma/client";
import { animals } from "../data/animals";
const prisma = new PrismaClient();

async function main() {
  await prisma.animal.create({
    data: {
      name: "Micheal Angelo",
      species: "Cat",
      dob: "07/02/21",
      color: "Brown",
      breed: "Mixed",
      gender: "Male",
      weight: "17",
      childFriendly: true,
      dogFriendly: true,
      catFriendly: true,
      vaccinationsUptoDate: true,
      description:
        "Michael Angelo is a lovely cat. He is not high maintaince and loves to wonder around outside.",
      additionalInfo: "",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Havana_Brown_-_choco.jpg",
      city: "Thornwood",
      state: "NY",
      streetAddress: "454 Swanson Dr",
      zipCode: "10594",
      contactEmail: "eric.pezzulo@gmail.com"
    },
  });

  await prisma.animal.createMany({
    data: animals,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
