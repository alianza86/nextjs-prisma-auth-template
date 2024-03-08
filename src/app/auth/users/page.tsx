import { getTenants } from "../tenants/tenants";
import UsersForm from "./UsersForm";
import UsersList from "./UsersList";
import { getUsers } from "./users";

export default async function UsersPage() {
  const users = await getUsers();
  const tenants = await getTenants();

  return (
    <section className="container">
      <h1 className="title">Users</h1>
      <UsersForm tenants={tenants} />
      <UsersList users={users} />
    </section>
  );
}
