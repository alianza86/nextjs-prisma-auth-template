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
    <div className="flex gap-3 items-center rounded-lg border py-3 px-5 bg-slate-200">
      <div className="flex-grow space-y-0">
        <h2 className="text-md font-medium text-slate-800">
          {firstName} {lastName}
        </h2>
        <p className="text-slate-600 text-sm">{email}</p>
        <p className="text-slate-600 text-sm">{tenant.name}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <button type="button" className="" onClick={() => deleteUser(id)}>
          <CircleX className="text-slate-600" />
        </button>
        <Link href={`users/${id}`}>
          <Pencil className="text-slate-600" />
        </Link>
      </div>
    </div>
  );
}
