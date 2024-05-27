/*
  Warnings:

  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('Task', 'Goal', 'Event', 'Note');

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_reminderId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_reminderId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "icon" TEXT;

-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "boardId" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "type" "NoteType" NOT NULL DEFAULT 'Task';

-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "cadence" SET DEFAULT '{"data": {}}';

-- DropTable
DROP TABLE "Goal";

-- DropTable
DROP TABLE "Task";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE SET NULL ON UPDATE CASCADE;
