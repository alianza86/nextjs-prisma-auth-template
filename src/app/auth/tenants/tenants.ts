"use server";

import db from "@/lib/db";

export async function getTenants() {
  const tenants = await db.tenant.findMany();

  return tenants;
}

export async function createTenant(data: any) {
  const tenantFound = await db.tenant.findUnique({
    where: {
      rfc: data.rfc,
    },
  });

  if (tenantFound) {
    throw new Error("Tenant already exists");
  }

  const newTenant = await db.tenant.create({ data });

  return newTenant;
}

export async function deleteTenant(id: string) {
  const deletedTenant = db.tenant.delete({ where: { id } });

  return deletedTenant;
}
