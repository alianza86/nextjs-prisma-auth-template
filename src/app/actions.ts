"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const CreateUserSchema = z
  .object({
    tenantId: z.string().uuid(),
    email: z.string().email(),
    firstName: z.string().trim().min(1, "Required"),
    lastName: z.string().trim().min(1, "Required"),
    password: z.string().trim().min(1, "Required"),
    confirmPassword: z.string().trim().min(1, "Required"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export async function createUser(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const result = CreateUserSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      errors: result.error.format(),
      message: null,
    };
  }

  const { confirmPassword, ...data } = result.data;

  const userFound = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userFound) {
    return {
      errors: {},
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  revalidatePath("/auth/users");
  redirect("/auth/users");

  // return newUser;
}

export async function editUser(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries());
  const result = CreateUserSchema.safeParse(rawFormData);

  if (!result.success) {
    return {
      errors: result.error.format(),
      message: null,
    };
  }

  const { confirmPassword, ...data } = result.data;

  const hashedPassword = await bcrypt.hash(data.password, 10);

  revalidatePath("/auth/users");
  redirect("/auth/users");
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({ where: { id } });
    revalidatePath("/auth/users");
  } catch (error) {
    return { message: "Could not delete user" };
  }
}
