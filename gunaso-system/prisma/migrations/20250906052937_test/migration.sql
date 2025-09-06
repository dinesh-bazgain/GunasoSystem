/*
  Warnings:

  - You are about to drop the column `code` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Ticket_code_key";

-- AlterTable
ALTER TABLE "public"."Ticket" DROP COLUMN "code";
