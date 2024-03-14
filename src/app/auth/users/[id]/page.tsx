import db from "@/lib/db";
import UsersForm from "@/app/auth/users/UsersForm";
import { useParams } from "next/navigation";

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const tenants = await db.tenant.findMany();
  const user = await db.user.findUnique({ where: { id: params.id } });
  console.log(user);

  return (
    <section className="container">
      <h1 className="title">Edit User</h1>
      <UsersForm tenants={tenants} user={user} />
    </section>
  );
}
