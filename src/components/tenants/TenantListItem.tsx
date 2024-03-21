"use client";

import { Tenant } from "@prisma/client";
import { CircleX, Pencil } from "lucide-react";
import { deleteTenant } from "../../app/auth/tenants/actions";
import Link from "next/link";

interface TenantListItemProps {
  tenant: Tenant;
}

export default function TenantListItem({
  tenant: { id, rfc, name },
}: TenantListItemProps) {
  return (
    <div className="flex gap-3 items-center rounded-lg border py-3 px-5 bg-background border-muted-foreground/50">
      <div className="flex-grow space-y-0">
        <h2 className="text-md font-medium text-foreground">{name}</h2>
        <p className="text-muted-foreground text-sm">{rfc}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="" onClick={() => deleteTenant(id)}>
          <CircleX className="text-muted-foreground" />
        </button>
        <Link href={`tenants/${id}`}>
          <Pencil className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
