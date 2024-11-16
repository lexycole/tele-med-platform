npx prisma init Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

After aadding new schema to prima 
run:
<!-- 1. migration: ensure the model exists in thedatabase:-->
npx prisma migrate dev --name init

<!-- 2. Run the Seed Script Again -->
npx prisma db seed


<!-- regenrate schema -->
npx prisma generate 


<!-- TO UPDATE A TABLE FISRTLY: -->
1. create a migration file and name it 
then update the migration file 
Finally, run migrate.

<!-- STEP 1: Create the Migration File -->
nox prisma migrate dev --create-only

<!-- STEP 2: Modify the Migration File -->
ALTER TABLE "Patient" 
ADD COLUMN "amount" VARCHAR(255) NOT NULL DEFAULT '0',
ADD COLUMN "currency" VARCHAR(255) NOT NULL DEFAULT 'USD',
ADD COLUMN "gender" VARCHAR(255) NOT NULL DEFAULT 'unknown',
ADD COLUMN "imageSrc" VARCHAR(255) NOT NULL DEFAULT 'default-image-url',
ADD COLUMN "mobile" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN "note" TEXT NOT NULL DEFAULT '',
ADD COLUMN "prefix" VARCHAR(255) NOT NULL DEFAULT 'Mr.',
ADD COLUMN "price" VARCHAR(255) NOT NULL DEFAULT '0',
ADD COLUMN "productName" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN "quantity" VARCHAR(255) NOT NULL DEFAULT '1',
ADD COLUMN "reference" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
ADD COLUMN "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW();

<!-- step 3: Run the Migration -->
npx prisma migrate dev



<!-- NEW after updaating schema -->
After updating the schema, run the following command to apply the changes to your database:

<!-- step 1 -->
npx prisma generate
<!-- step 2 -->
npx prisma db push

