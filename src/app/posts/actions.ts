"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreatePostSchema } from "../../lib/validation";

export async function createPost(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { title, content } = CreatePostSchema.parse(values);

  await db.post.create({
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });

  revalidatePath("/posts");
  redirect("/posts");
}

export async function editPost(id: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const { title, content } = CreatePostSchema.parse(values);

  await db.post.update({
    where: { id },
    data: {
      title: title.trim(),
      content: content.trim(),
    },
  });

  revalidatePath("/posts");
  redirect("/posts");
}

export async function deletePost(id: string) {
  await db.post.delete({ where: { id } });
  revalidatePath("/posts");
}
