/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "departmentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_departmentId_key" ON "User"("departmentId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
