import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between bg-zinc-800  text-white px-24 items-center py-3">
      <h2 className="text-xl font-bold">NextAuth</h2>
      <ul className="flex gap-2">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/tenants">Tenants</Link>
            </li>
            <li>
              <Link href="/auth/users">Users</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
