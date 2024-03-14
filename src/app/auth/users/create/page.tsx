import db from "@/lib/db";
import UsersForm from "../UsersForm";

export default async function CreateUserPage() {
  const tenants = await db.tenant.findMany();

  return (
    <section className="container">
      <h1 className="title">Create New User</h1>
      <UsersForm tenants={tenants} />
    </section>
  );
}
