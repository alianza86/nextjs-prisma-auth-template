import PostsFilter from "./PostsFilter";
import PostsList from "./PostsList";

export interface PostSearchParams {
  q?: string;
  page?: string;
  pageSize?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: PostSearchParams;
}) {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Posts</h1>
      </div>
      <section className="flex flex-col gap-4">
        <PostsFilter />
        <PostsList params={searchParams} />
      </section>
    </main>
  );
}
