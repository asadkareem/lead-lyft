/*
  Warnings:

  - You are about to drop the column `duteDate` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "duteDate",
ADD COLUMN     "dueDate" TIMESTAMP(3);
