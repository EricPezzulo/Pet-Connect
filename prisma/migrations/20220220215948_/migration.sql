/*
  Warnings:

  - Added the required column `contactEmail` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "contactEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "emailContent" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);
