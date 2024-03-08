import { auth } from "../../../lib/auth";
import NewTenant from "./NewTenant";

async function getTenants() {
  const url = process.env.NEXTAUTH_URL + "/api/auth/tenants";
  const res = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function TenantsPage() {
  const tenants: any[] = await getTenants();

  return (
    <section className="container">
      <h1 className="title">Tenants</h1>
      <NewTenant />
      <div className="grid grid-cols-1 gap-2">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="w-full grid grid-cols-2 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
          >
            <div>{tenant.rfc}</div>
            <div>{tenant.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
