/*
  Warnings:

  - You are about to drop the column `habitGoalAchieved` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Action` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Action" DROP CONSTRAINT "Action_userId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "habitGoalAchieved",
DROP COLUMN "userId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
