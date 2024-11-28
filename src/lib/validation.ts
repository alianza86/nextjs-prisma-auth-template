import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

//Auth
export const loginSchema = z.object({
  email: requiredString,
  password: requiredString.min(3, "Password must be at least 3 characters"),
});

export type loginValues = z.infer<typeof loginSchema>;

//Users
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

export const userFilterSchema = z.object({
  q: z.string().optional(),
  tenantId: z.string().optional(),
});

export type UserFilterValues = z.infer<typeof userFilterSchema>;

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

//Posts
export const CreatePostSchema = z.object({
  title: requiredString,
  content: requiredString,
});

export type CreatePostValues = z.infer<typeof CreatePostSchema>;

export const postFilterSchema = z.object({
  q: z.string().optional(),
});

export type PostFilterValues = z.infer<typeof postFilterSchema>;
