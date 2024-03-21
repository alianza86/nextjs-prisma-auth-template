import db from "@/lib/db";
import PostListItem from "./PostsListItem";

export default async function PostsList() {
  const posts = await db.post.findMany({});

  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
    </div>
  );
}
