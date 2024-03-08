import RegisterForm from "./RegisterForm";

async function getTenants() {
  const url = process.env.NEXTAUTH_URL + "/api/auth/tenants";
  const res = await fetch(url, {
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

export default async function RegisterPage() {
  const tenants = await getTenants();

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <RegisterForm tenants={tenants} />
    </div>
  );
}
