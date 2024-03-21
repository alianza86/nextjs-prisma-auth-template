import PostsForm from "../../../components/posts/PostsForm";

export default async function Page() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Create New Post</h1>
      </div>
      <PostsForm />
    </main>
  );
}
