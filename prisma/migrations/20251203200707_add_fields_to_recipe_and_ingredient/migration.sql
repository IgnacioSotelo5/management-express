/*
  Warnings:

  - The primary key for the `RecipeIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recipeId` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `cost` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profitMargin` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestedPrice` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - The required column `_id` was added to the `RecipeIngredient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `quantity` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "profitMargin" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "suggestedPrice" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_pkey",
DROP COLUMN "recipeId",
ADD COLUMN     "_id" TEXT NOT NULL,
ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL,
ADD CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("_id");

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient__id_fkey" FOREIGN KEY ("_id") REFERENCES "Recipe"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
