"use client";

import { useForm } from "react-hook-form";
import InputField from "../../../components/InputField";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const { confirmPassword: _, ...serverData } = data;

    // console.log(serverData);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(serverData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className="w-1/3">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <div id="container" className="grid grid-cols-1 gap-4">
          <div>
            <InputField
              name="email"
              label="Email"
              type="email"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="firstName"
              label="First Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="lastName"
              label="Last Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="password"
              label="Password"
              type="password"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
