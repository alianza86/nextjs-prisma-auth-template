"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUserSchema } from "../../../lib/validation";

export async function createUser(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { email, firstName, lastName, tenantId, password } =
    createUserSchema.parse(values);

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      tenantId,
      password: hashedPassword,
    },
  });

  revalidatePath("/auth/users");
  redirect("/auth/users");
}

export async function editUser(
  id: string,
  formData: FormData,
  originalPassword: string
) {
  const values = Object.fromEntries(formData.entries());

  const { email, firstName, lastName, tenantId, password } =
    createUserSchema.parse(values);

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id },
    data: {
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      tenantId,
      password:
        password === originalPassword ? originalPassword : hashedPassword,
    },
  });

  revalidatePath("/auth/users");
  redirect("/auth/users");
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });
  revalidatePath("/auth/users");
}

export async function userExists(email: string, originalEmail?: string) {
  if (originalEmail && email === originalEmail) {
    return false;
  }

  const user = await db.user.findUnique({ where: { email } });

  return !!user;
}
