/*
  Warnings:

  - Added the required column `amount` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefix` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reference` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
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
ADD COLUMN "reference" VARCHAR(255) NOT NULL DEFAULT ''

