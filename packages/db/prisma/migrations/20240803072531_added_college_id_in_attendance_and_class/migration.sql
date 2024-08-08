-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "collegeId" INTEGER NOT NULL DEFAULT 200;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "collegeId" INTEGER NOT NULL DEFAULT 200;

-- CreateIndex
CREATE INDEX "Attendance_collegeId_idx" ON "Attendance"("collegeId");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
