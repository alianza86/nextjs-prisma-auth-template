import db from "@/lib/db";
import { auth } from "../../lib/auth";
import PostsForm from "./PostsForm";

async function getPosts() {
  const posts = await db.post.findMany();

  return posts;
}

async function createPost(data: any) {
  "use server";

  const newPost = await db.post.create({
    data,
  });

  return newPost;
}

export default async function PostsPage() {
  const posts: any[] = await getPosts();

  return (
    <section className="container">
      <h1 className="title">Posts</h1>
      <PostsForm create={createPost} />
      <div className="grid grid-cols-1 gap-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="w-full grid grid-cols-2 gap-2 items-center px-8 py-2 bg-slate-600 text-slate-200 rounded-md shadow-md"
          >
            <div>{post.title}</div>
            <div>{post.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
