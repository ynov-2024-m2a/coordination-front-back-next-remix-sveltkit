-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dueDate" TIMESTAMP(3);
