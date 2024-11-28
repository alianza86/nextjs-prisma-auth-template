import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostFilterValues } from "../../lib/validation";
import { cn } from "../../lib/utils";
import { PostSearchParams } from "./page";
import PostListItem from "./PostListItem";

export default async function PostsList({
  params: { q, page = "1", pageSize = "2" },
}: {
  params: PostSearchParams;
}) {
  const skip = (+page - 1) * +pageSize;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.PostWhereInput = searchString
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { content: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const where: Prisma.PostWhereInput = {
    AND: [searchFilter],
  };

  const postsPromise = db.post.findMany({
    where,
    orderBy: { title: "asc" },
    take: +pageSize,
    skip,
  });

  const countPromise = db.post.count({ where });

  const [posts, totalResults] = await Promise.all([postsPromise, countPromise]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <PostListItem post={post} key={post.id} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="mx-auto text-center">
          No posts found. Try adjusting your search filters
        </p>
      )}
      {posts.length > 0 && (
        <Pagination
          currentPage={+page}
          pageSize={+pageSize}
          totalPages={Math.ceil(totalResults / +pageSize)}
          filterValues={{ q }}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  filterValues: PostFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  filterValues: { q },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    return `/posts/?${searchParams.toString()}`;
  }

  return (
    <div className="flex justify-between">
      <Link
        href={generatePageLink(currentPage - 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage <= 1 && "invisible"
        )}
      >
        <ArrowLeft size={16} />
        Previous page
      </Link>
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={generatePageLink(currentPage + 1)}
        className={cn(
          "flex items-center gap-2 font-semibold",
          currentPage >= totalPages && "invisible"
        )}
      >
        Next page
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
