import TenantsForm from "../../../../components/tenants/TenantsForm";

export default async function CreateTenantPage() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Create New Tenant</h1>
      </div>
      <TenantsForm />
    </main>
  );
}
