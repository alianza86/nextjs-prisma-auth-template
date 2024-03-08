"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function getUsers() {
  const users = await db.user.findMany();

  return users;
}

export async function createUser(data: any) {
  const userFound = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userFound) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await db.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  const { password: _, ...user } = newUser;

  return newUser;
}

export async function deleteUser(id: string) {
  const deletedUser = db.user.delete({ where: { id } });

  return deletedUser;
}
