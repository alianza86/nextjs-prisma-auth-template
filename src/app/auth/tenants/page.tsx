import Link from "next/link";
import TenantsList from "../../../components/tenants/TenantsList";
import { Button } from "../../../components/ui/button";

export default async function Page() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Tenants</h1>
      </div>
      <section className="flex flex-col gap-4">
        <div>
          <Link className="btn-primary mb-6" href="/auth/tenants/create">
            <Button variant={"default"}>Create New Tenant</Button>
          </Link>
        </div>
        <TenantsList />
      </section>
    </main>
  );
}
