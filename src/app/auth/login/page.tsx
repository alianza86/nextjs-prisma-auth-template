import LoginForm from "../../../components/LoginForm";

export default async function Page() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="title">Please Login</h1>
      </div>
      <LoginForm />
    </main>
  );
}
