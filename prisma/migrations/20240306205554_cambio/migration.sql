/*
  Warnings:

  - A unique constraint covering the columns `[rfc]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tenant_rfc_key" ON "Tenant"("rfc");
