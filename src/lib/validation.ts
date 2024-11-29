import { z } from "zod";

export const requiredString = z.string().trim().min(1, "Required");

//Auth
export const loginSchema = z.object({
  email: requiredString,
  password: requiredString.min(3, "Password must be at least 3 characters"),
});

export type loginValues = z.infer<typeof loginSchema>;

//Tenants
export const createTenantSchema = z.object({
  rfc: requiredString,
  name: requiredString,
});

export type CreateTenantValues = z.infer<typeof createTenantSchema>;

export const tenantFilterSchema = z.object({
  q: z.string().optional(),
});

export type TenantFilterValues = z.infer<typeof tenantFilterSchema>;
