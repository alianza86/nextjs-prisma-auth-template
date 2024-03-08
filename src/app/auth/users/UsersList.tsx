"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteUser } from "./users";

export default function UsersList({ users }: { users: User[] }) {
  const router = useRouter();

  const remove = async (id: string) => {
    await deleteUser(id);
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="w-full grid grid-cols-3 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
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
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
