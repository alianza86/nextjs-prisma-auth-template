"use client";

import { Post } from "@prisma/client";
import { CircleX, Pencil } from "lucide-react";
import Link from "next/link";
import { deletePost } from "./actions";
import { useSearchParams } from "next/navigation";

interface PostListItemProps {
  post: Post;
}

export default function PostListItem({
  post: { id, title, content },
}: PostListItemProps) {
  const searchParams = useSearchParams().toString();

  return (
    <div className="flex gap-3 items-center rounded-lg border py-3 px-5 bg-card border-muted-foreground/50">
      <div className="flex-grow space-y-0">
        <h2 className="text-md font-medium text-foreground">{title}</h2>
        <p className="text-muted-foreground text-sm">{content}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="" onClick={() => deletePost(id)}>
          <CircleX className="text-muted-foreground" />
        </button>
        <Link href={`posts/${id}?${searchParams}`}>
          <Pencil className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
