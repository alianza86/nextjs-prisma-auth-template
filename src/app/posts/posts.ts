"use server";

import db from "@/lib/db";

export async function getPosts() {
  const posts = await db.post.findMany();

  return posts;
}

export async function createPost(data: any) {
  const newPost = await db.post.create({ data });

  return newPost;
}

export async function deletePost(id: string) {
  const deletedPost = db.post.delete({ where: { id } });

  return deletedPost;
}
