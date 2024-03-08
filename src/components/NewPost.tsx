"use client";

import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { useRouter } from "next/navigation";

export default function NewPost() {
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
    <div className="">
      <form onSubmit={onSubmit} className="w-1/3">
        <h1 className="text-slate-200 font-bold text-4xl mb-4">New Post</h1>
        <div id="container" className="grid grid-cols-1 gap-4">
          <div>
            <InputField
              name="title"
              label="Title"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="content"
              label="Content"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
