"use client";

import { Post } from "@prisma/client";
import { CircleX, Pencil } from "lucide-react";
import Link from "next/link";
import { deletePost } from "../../app/posts/actions";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({
  post: { id, title, content },
}: PostListItemProps) {
  return (
    <div className="flex gap-3 items-center rounded-lg border py-3 px-5 bg-card">
      <div className="flex-grow space-y-0">
        <h2 className="text-md font-medium text-foreground">{title}</h2>
        <p className=" text-muted-foreground">{content}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="" onClick={() => deletePost(id)}>
          <CircleX className="text-muted-foreground" />
        </button>
        <Link href={`posts/${id}`}>
          <Pencil className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
