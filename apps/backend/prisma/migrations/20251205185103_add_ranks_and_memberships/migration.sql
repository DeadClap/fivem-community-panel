/*
  Warnings:

  - You are about to alter the column `code` on the `Department` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.

*/
-- CreateEnum
CREATE TYPE "RankBand" AS ENUM ('BASE', 'SUPERVISOR', 'LEADERSHIP', 'OWNER');

-- DropIndex
DROP INDEX "Department_code_key";

-- AlterTable
ALTER TABLE "Department" ALTER COLUMN "code" SET DATA TYPE VARCHAR(8);

-- CreateTable
CREATE TABLE "DepartmentRank" (
    "id" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortCode" VARCHAR(8),
    "level" INTEGER NOT NULL,
    "band" "RankBand" NOT NULL DEFAULT 'BASE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DepartmentRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDepartmentMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "rankId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDepartmentMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DepartmentRank_departmentId_level_idx" ON "DepartmentRank"("departmentId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "UserDepartmentMembership_userId_departmentId_key" ON "UserDepartmentMembership"("userId", "departmentId");

-- AddForeignKey
ALTER TABLE "DepartmentRank" ADD CONSTRAINT "DepartmentRank_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepartmentMembership" ADD CONSTRAINT "UserDepartmentMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepartmentMembership" ADD CONSTRAINT "UserDepartmentMembership_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDepartmentMembership" ADD CONSTRAINT "UserDepartmentMembership_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "DepartmentRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
