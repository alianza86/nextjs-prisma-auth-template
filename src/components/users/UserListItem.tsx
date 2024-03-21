"use client";

import { User, Prisma } from "@prisma/client";
import { CircleX, Pencil } from "lucide-react";
import { deleteUser } from "../../app/auth/users/actions";
import Link from "next/link";

interface JobListItemProps {
  user: Prisma.UserGetPayload<{
    include: { tenant: true };
  }>;
}

export default function UserListItem({
  user: { firstName, lastName, email, id, tenant },
}: JobListItemProps) {
  return (
    <div className="flex gap-3 items-center rounded-lg border py-3 px-5 border-muted-foreground/50 ">
      <div className="flex-grow space-y-0">
        <h2 className="text-md font-medium text-foreground">
          {firstName} {lastName}
        </h2>
        <p className="text-muted-foreground text-sm">{email}</p>
        <p className="text-muted-foreground text-sm">{tenant.name}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="" onClick={() => deleteUser(id)}>
          <CircleX className="text-muted-foreground" />
        </button>
        <Link href={`users/${id}`}>
          <Pencil className="text-muted-foreground" />
        </Link>
      </div>
    </div>
  );
}
