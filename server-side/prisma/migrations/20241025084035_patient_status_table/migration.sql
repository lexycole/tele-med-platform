/*
  Warnings:

  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `patient` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "patient" VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN     "status" VARCHAR(255) NOT NULL DEFAULT ''
