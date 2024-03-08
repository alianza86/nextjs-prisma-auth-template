import TenantsForm from "./TenantsForm";
import TenantsList from "./TenantsList";
import { getTenants } from "./tenants";

export default async function TenantsPage() {
  const tenants: any[] = await getTenants();

  return (
    <section className="container">
      <h1 className="title">Tenants</h1>
      <TenantsForm />
      <TenantsList tenants={tenants} />
    </section>
  );
}
