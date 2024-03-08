import PostsForm from "./PostsForm";
import PostsList from "./PostsList";
import { getPosts } from "./posts";

export default async function PostsPage() {
  const posts: any[] = await getPosts();

  return (
    <section className="container">
      <h1 className="title">Posts</h1>
      <PostsForm />
      <PostsList posts={posts} />
    </section>
  );
}
