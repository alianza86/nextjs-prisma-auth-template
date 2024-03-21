import db from "@/lib/db";
import TenantsForm from "../../../../components/tenants/TenantsForm";

interface EditTenantPageProps {
  params: { id: string };
}

export default async function EditTenantPage({
  params: { id },
}: EditTenantPageProps) {
  const tenant = await db.tenant.findUniqueOrThrow({ where: { id } });

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Modify Tenant</h1>
      </div>
      <TenantsForm tenant={tenant} />
    </main>
  );
}
