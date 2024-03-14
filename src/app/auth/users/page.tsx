import Link from "next/link";
import UsersList from "./UsersList";
import db from "@/lib/db";

export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <section className="container">
      <h1 className="title">Users</h1>
      <div>
        <Link className="btn-primary mb-6" href="/auth/users/create">
          Create User
        </Link>
      </div>
      <UsersList users={users} />
    </section>
  );
}
