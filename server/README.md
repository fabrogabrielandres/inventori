Install dependencies npm install
Start the database docker compose up -d
Run Primsa migrations ```npx prisma migrate dev````
Run seed npm run seed
Run the project npm run dev
Run in prod
to see the db. npx prisma studio --config ./prisma.config.ts
