/*
  Warnings:

  - A unique constraint covering the columns `[departmentId,name]` on the table `DepartmentRank` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DepartmentRank_departmentId_name_key" ON "DepartmentRank"("departmentId", "name");
