import Link from "next/link";
import UsersList from "../../../components/users/UsersList";
import { Button } from "../../../components/ui/button";

export default async function Page() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Users</h1>
      </div>
      <section className="flex flex-col gap-4">
        <div>
          <Link className="btn-primary mb-6" href="/auth/users/create">
            <Button variant={"default"}>Create New User</Button>
          </Link>
        </div>
        <UsersList />
      </section>
    </main>
  );
}
