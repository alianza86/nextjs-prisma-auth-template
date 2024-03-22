import Link from "next/link";
import { auth } from "@/lib/auth";
import ToggleDarkMode from "./ToggleDarkMode";
import { Suspense } from "react";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex justify-between bg-muted  text-foreground px-24 items-center py-3">
      <h2 className="text-xl font-bold">NextAuth</h2>

      <ul className="flex gap-4 items-center">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
          </>
        ) : session.user.role === "admin" ? (
          <>
            <li>{session.user.name}</li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
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
            <li>{session.user.name}</li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )}
        <li className="flex items-center">
          <ToggleDarkMode />
        </li>
      </ul>
    </nav>
  );
}
