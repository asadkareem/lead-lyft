/*
  Warnings:

  - You are about to drop the column `clinetId` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_clinetId_fkey";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "clinetId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
