/*
  Warnings:

  - You are about to drop the column `userId` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `clinetId` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_userId_fkey";

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "userId",
ADD COLUMN     "clinetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_clinetId_fkey" FOREIGN KEY ("clinetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
