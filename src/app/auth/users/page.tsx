import db from "@/lib/db";
import UsersList from "./UsersList";
import UsersFilter from "./UsersFilter";

// interface PageProps {
//   searchParams: {

//   };
// }

export interface SearchParams {
  q?: string;
  tenantId?: string;
  page?: string;
  pageSize?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const tenants = await db.tenant.findMany({});

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Users</h1>
      </div>
      <section className="flex flex-col gap-4">
        <div className="w-full flex justify-end"></div>
        <UsersFilter tenants={tenants} />
        <UsersList params={searchParams} />
      </section>
    </main>
  );
}
