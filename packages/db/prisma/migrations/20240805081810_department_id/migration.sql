/*
  Warnings:

  - You are about to drop the column `department` on the `Class` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Class_year_division_department_idx";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "collegeId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "department",
ADD COLUMN     "departmentId" INTEGER NOT NULL DEFAULT -1,
ALTER COLUMN "collegeId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Class_year_division_departmentId_idx" ON "Class"("year", "division", "departmentId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
