import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const createUserSchema = z
  .object({
    tenantId: z.string().uuid(),
    email: requiredString.email(),
    firstName: requiredString,
    lastName: requiredString,
    password: requiredString,
    confirmPassword: requiredString,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export type CreateUserValues = z.infer<typeof createUserSchema>;

export const createTenantSchema = z.object({
  rfc: requiredString,
  name: requiredString,
});

export type CreateTenantValues = z.infer<typeof createTenantSchema>;
