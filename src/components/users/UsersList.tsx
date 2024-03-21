import db from "@/lib/db";
import UserListItem from "./UserListItem";

export default async function UsersList() {
  const users = await db.user.findMany({ include: { tenant: true } });

  return (
    <div className="grid grid-cols-1 gap-4">
      {users.map((user) => (
        <UserListItem user={user} key={user.id} />
      ))}
    </div>
  );
}
