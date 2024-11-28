import db from "@/lib/db";
import UserListItem from "./UserListItem";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UserFilterValues } from "../../../lib/validation";
import { cn } from "../../../lib/utils";
import { SearchParams } from "./page";

export default async function UsersList({
  params: { q, tenantId, page = "1", pageSize = "2" },
}: {
  params: SearchParams;
}) {
  const skip = (+page - 1) * +pageSize;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.UserWhereInput = searchString
    ? {
        OR: [
          { email: { contains: q, mode: "insensitive" } },
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const where: Prisma.UserWhereInput = {
    AND: [searchFilter, tenantId ? { tenantId } : {}],
  };

  const usersPromise = db.user.findMany({
    where,
    include: { tenant: true },
    orderBy: { firstName: "asc" },
    take: +pageSize,
    skip,
  });

  const countPromise = db.user.count({ where });

  const [users, totalResults] = await Promise.all([usersPromise, countPromise]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
      </div>
      {users.length === 0 && (
        <p className="mx-auto text-center">
          No users found. Try adjusting your search filters
        </p>
      )}
      {users.length > 0 && (
        <Pagination
          currentPage={+page}
          pageSize={+pageSize}
          totalPages={Math.ceil(totalResults / +pageSize)}
          filterValues={{ q, tenantId }}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  filterValues: UserFilterValues;
}

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  filterValues: { q, tenantId },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(tenantId && { tenantId }),
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    return `/auth/users/?${searchParams.toString()}`;
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
