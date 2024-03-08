"use client";

import { Post } from "@prisma/client";
import { deletePost } from "./posts";
import { useRouter } from "next/navigation";

export default function PostsList({ posts }: { posts: Post[] }) {
  const router = useRouter();

  const remove = async (id: string) => {
    await deletePost(id);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full grid grid-cols-3 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
        >
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>
            <button
              type="button"
              className="self-end"
              onClick={() => remove(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
