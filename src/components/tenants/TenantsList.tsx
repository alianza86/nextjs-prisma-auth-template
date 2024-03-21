import db from "@/lib/db";
import TenantListItem from "./TenantListItem";

export default async function TenantsList() {
  const tenants = await db.tenant.findMany({});

  return (
    <div className="grid grid-cols-1 gap-4">
      {tenants.map((tenant) => (
        <TenantListItem tenant={tenant} key={tenant.id} />
      ))}
    </div>
  );
}
