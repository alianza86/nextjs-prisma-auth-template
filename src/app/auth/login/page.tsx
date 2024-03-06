"use client";

import { useForm } from "react-hook-form";
import InputField from "../../../components/InputField";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res?.ok) {
      setError(res?.error);
      return;
    }

    router.push("/posts");
    router.refresh();
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/3">
        {error && (
          <p className="bg-red-500 text-lg text-white rounded-md px-3 py-2 mb-2">
            {error}
          </p>
        )}

        <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>
        <div id="container" className="grid grid-cols-1 gap-4">
          <div>
            <InputField
              name="email"
              label="Email"
              options={{
                required: {
                  value: true,
                  message: "Email is required",
                },
              }}
              register={register}
              errors={errors}
            />
          </div>

          <div>
            <InputField
              name="password"
              label="Password"
              type="password"
              options={{
                required: {
                  value: true,
                  message: "Password is required",
                },
              }}
              register={register}
              errors={errors}
            />
          </div>

          <div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
