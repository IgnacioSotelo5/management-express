-- CreateTable
CREATE TABLE "Invitation" (
    "_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "bakeryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_email_bakeryId_key" ON "Invitation"("email", "bakeryId");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_bakeryId_fkey" FOREIGN KEY ("bakeryId") REFERENCES "Bakery"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
