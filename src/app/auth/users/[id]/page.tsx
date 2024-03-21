import db from "@/lib/db";
import UsersForm from "@/components/users/UsersForm";

interface EditUserPageProps {
  params: { id: string };
}

export default async function EditUserPage({
  params: { id },
}: EditUserPageProps) {
  const tenants = await db.tenant.findMany();
  const user = await db.user.findUniqueOrThrow({ where: { id } });

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Modify User</h1>
      </div>
      <UsersForm tenants={tenants} user={user} />
    </main>
  );
}
