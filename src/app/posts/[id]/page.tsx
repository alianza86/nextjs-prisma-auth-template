import db from "@/lib/db";
import PostsForm from "../PostsForm";

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({
  params: { id },
}: EditPostPageProps) {
  const post = await db.post.findUniqueOrThrow({ where: { id } });

  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Modify Post</h1>
      </div>
      <PostsForm post={post} />
    </main>
  );
}
