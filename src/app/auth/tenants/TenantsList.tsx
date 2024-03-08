"use client";

import { Tenant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteTenant } from "./tenants";

export default function TenantsList({ tenants }: { tenants: Tenant[] }) {
  const router = useRouter();

  const remove = async (id: string) => {
    await deleteTenant(id);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {tenants.map((tenant) => (
        <div
          key={tenant.id}
          className="w-full grid grid-cols-3 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
        >
          <div>{tenant.rfc}</div>
          <div>{tenant.name}</div>
          <div>
            <button
              type="button"
              className="self-end"
              onClick={() => remove(tenant.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
