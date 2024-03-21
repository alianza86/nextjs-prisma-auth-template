import db from "@/lib/db";
import UsersForm from "../../../../components/users/UsersForm";

export default async function CreateUserPage() {
  const tenants = await db.tenant.findMany();

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Create New User</h1>
      </div>
      <UsersForm tenants={tenants} />
    </main>
  );
}
