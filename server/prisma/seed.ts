import { prisma } from "../lib";
import { modelNames, seedData } from "./seedData/seedData";

async function deleteAllData() {
  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function main() {


  await deleteAllData();

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${modelName}`);
      continue;
    }
    for (const data of seedData[modelName as keyof typeof seedData]) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${modelName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
