import Link from "next/link";
import UsersList from "../../../components/users/UsersList";
import { Button } from "../../../components/ui/button";
import { UserFilterValues } from "../../../lib/validation";
import db from "@/lib/db";
import UsersFilter from "../../../components/users/UsersFilter";

interface PageProps {
  searchParams: {
    q?: string;
    tenantId?: string;
    page?: string;
    pageSize?: string;
  };
}

export default async function Page({
  searchParams: { q, tenantId, page, pageSize },
}: PageProps) {
  const tenants = await db.tenant.findMany({});

  const filterValues: UserFilterValues = {
    q,
    tenantId,
  };

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Users</h1>
      </div>
      <section className="flex flex-col gap-4">
        <div className="w-full flex justify-end"></div>
        <UsersFilter defaultValues={filterValues} tenants={tenants} />
        <UsersList
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
