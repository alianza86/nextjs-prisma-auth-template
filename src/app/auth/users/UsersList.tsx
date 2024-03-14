"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteUser } from "../../actions";
import { useState } from "react";
import { CircleX, Pencil } from "lucide-react";
import Link from "next/link";
// import { deleteUser } from "./users";

export default function UsersList({ users }: { users: User[] }) {
  const [message, setMessage] = useState<string | null>(null);

  const remove = async (id: string) => {
    const res = await deleteUser(id);
    console.log(res);
    if (res?.message) setMessage(res.message);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      <div>
        {message && <span className="errorMessage mb-6">{message}</span>}
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className="w-full grid grid-cols-4 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
        >
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{user.email}</div>
          <div>
            <button
              type="button"
              className="self-end"
              onClick={() => remove(user.id)}
            >
              <CircleX />
            </button>
          </div>
          <div>
            <Link href={`users/${user.id}`}>
              <Pencil />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
