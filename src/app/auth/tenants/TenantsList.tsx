import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { UserFilterValues } from "../../../lib/validation";
import { cn } from "../../../lib/utils";
import { TenantSearchParams } from "./page";
import TenantListItem from "./TenantListItem";

export default async function TenantsList({
  params: { q, page = "1", pageSize = "2" },
}: {
  params: TenantSearchParams;
}) {
  const skip = (+page - 1) * +pageSize;

  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.TenantWhereInput = searchString
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { rfc: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const where: Prisma.TenantWhereInput = {
    AND: [searchFilter],
  };

  const tenantsPromise = db.tenant.findMany({
    where,
    orderBy: { name: "asc" },
    take: +pageSize,
    skip,
  });

  const countPromise = db.tenant.count({ where });

  const [tenants, totalResults] = await Promise.all([
    tenantsPromise,
    countPromise,
  ]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {tenants.map((tenant) => (
          <TenantListItem tenant={tenant} key={tenant.id} />
        ))}
      </div>
      {tenants.length === 0 && (
        <p className="mx-auto text-center">
          No tenants found. Try adjusting your search filters
        </p>
      )}
      {tenants.length > 0 && (
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

    return `/auth/tenants/?${searchParams.toString()}`;
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
