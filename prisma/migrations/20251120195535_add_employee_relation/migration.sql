-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employeeAtId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeAtId_fkey" FOREIGN KEY ("employeeAtId") REFERENCES "Bakery"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
