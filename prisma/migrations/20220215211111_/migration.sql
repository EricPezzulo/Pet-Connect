/*
  Warnings:

  - Added the required column `city` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetAddress` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "streetAddress" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;
