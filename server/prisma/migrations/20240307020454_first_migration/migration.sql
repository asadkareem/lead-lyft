-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN', 'COACH', 'CORPORATE');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "ActionStatus" AS ENUM ('INCOMPLETE', 'INPROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coachId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "departmentName" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadLyftCategory" (
    "id" SERIAL NOT NULL,
    "leadLyftCatName" TEXT NOT NULL,
    "leadLyftCatMinScore" DOUBLE PRECISION NOT NULL,
    "leadLyftCatMaxScore" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LeadLyftCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadLyft" (
    "id" SERIAL NOT NULL,
    "privateNote" TEXT NOT NULL,
    "leadLyftScore" DOUBLE PRECISION NOT NULL,
    "leadLyftCatId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "coahInputRequested" BOOLEAN DEFAULT false,
    "coachInputGranted" BOOLEAN DEFAULT false,
    "coachComments" TEXT,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "LeadLyft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" SERIAL NOT NULL,
    "habitName" TEXT NOT NULL,
    "habitGoalSet" INTEGER NOT NULL,
    "note" TEXT,
    "habitGoalAchieved" INTEGER NOT NULL,
    "coahInputRequested" BOOLEAN DEFAULT false,
    "coachInputGranted" BOOLEAN DEFAULT false,
    "coachComments" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "actionName" TEXT NOT NULL,
    "actionStatus" "ActionStatus" NOT NULL DEFAULT 'INCOMPLETE',
    "habitGoalAchieved" INTEGER NOT NULL,
    "coahInputRequested" BOOLEAN DEFAULT false,
    "coachInputGranted" BOOLEAN DEFAULT false,
    "coachComments" TEXT,
    "userId" INTEGER NOT NULL,
    "note" TEXT,
    "duteDate" TIMESTAMP(3),
    "actionCategoryId" INTEGER,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Qoutes" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Qoutes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadLyft" ADD CONSTRAINT "LeadLyft_leadLyftCatId_fkey" FOREIGN KEY ("leadLyftCatId") REFERENCES "LeadLyftCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadLyft" ADD CONSTRAINT "LeadLyft_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Action" ADD CONSTRAINT "Action_actionCategoryId_fkey" FOREIGN KEY ("actionCategoryId") REFERENCES "LeadLyftCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
