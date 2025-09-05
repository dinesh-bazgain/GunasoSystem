-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "wardId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "public"."Ward"("id") ON DELETE SET NULL ON UPDATE CASCADE;
