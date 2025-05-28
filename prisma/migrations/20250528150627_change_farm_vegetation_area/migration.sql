/*
  Warnings:

  - You are about to drop the column `vegetable_area` on the `farm` table. All the data in the column will be lost.
  - Added the required column `vegetation_area` to the `farm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "farm" DROP COLUMN "vegetable_area",
ADD COLUMN     "vegetation_area" DECIMAL(10,2) NOT NULL;
