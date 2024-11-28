import PostsForm from "../PostsForm";

export default async function CreatePostPage() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Create New Post</h1>
      </div>
      <PostsForm />
    </main>
  );
}
