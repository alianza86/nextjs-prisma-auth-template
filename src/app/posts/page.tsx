import Link from "next/link";
import { Button } from "../../components/ui/button";
import PostsList from "../../components/posts/PostsList";

export default async function Page() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Posts</h1>
      </div>
      <section className="flex flex-col gap-4">
        <div>
          <Link className="btn-primary mb-6" href="/posts/create">
            <Button variant={"default"}>Create New Post</Button>
          </Link>
        </div>
        <PostsList />
      </section>
    </main>
  );
}
