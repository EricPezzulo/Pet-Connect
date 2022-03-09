import { PrismaClient } from "@prisma/client";
import { animals } from "../data/animals";
const prisma = new PrismaClient();

async function main() {
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
