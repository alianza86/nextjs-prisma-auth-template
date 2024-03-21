"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createTenantSchema } from "../../../lib/validation";

export async function createTenant(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { rfc, name } = createTenantSchema.parse(values);

  await db.tenant.create({
    data: {
      rfc: rfc.trim(),
      name: name.trim(),
    },
  });

  revalidatePath("/auth/tenants");
  redirect("/auth/tenants");
}

export async function editTenant(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { rfc, name } = createTenantSchema.parse(values);

  await db.tenant.update({
    where: { id },
    data: {
      rfc: rfc.trim(),
      name: name.trim(),
    },
  });

  revalidatePath("/auth/tenants");
  redirect("/auth/tenants");
}

export async function deleteTenant(id: string) {
  await db.tenant.delete({ where: { id } });
  revalidatePath("/auth/tenants");
}

export async function tenantExists(rfc: string, originalRfc?: string) {
  if (originalRfc && rfc === originalRfc) {
    return false;
  }

  const tenant = await db.tenant.findUnique({ where: { rfc } });

  return !!tenant;
}
