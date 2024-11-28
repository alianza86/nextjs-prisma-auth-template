import { SearchParams } from "../users/page";
import TenantsFilter from "./TenantsFilter";
import TenantsList from "./TenantsList";

export interface TenantSearchParams {
  q?: string;
  page?: string;
  pageSize?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Tenants</h1>
      </div>
      <section className="flex flex-col gap-4">
        <TenantsFilter />
        <TenantsList params={searchParams} />
      </section>
    </main>
  );
}
