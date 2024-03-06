"use client";
import { signOut } from "next-auth/react";

export default function PostsPage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>
        <h1 className="text-4xl text-slate-200 font-bold mb-4">Posts Page</h1>
        <button
          onClick={() => signOut()}
          className="bg-white text-black px-3 py-2 rounded-md mt-4"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
