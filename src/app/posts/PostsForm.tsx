"use client";

import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createPost } from "./posts";

export default function PostsForm() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const newPost = await createPost(data);
    reset();
    router.refresh();
  });

  return (
    <div className="my-8">
      <form action="" onSubmit={onSubmit}>
        <div className="formContainer">
          <div className="col-span-6">
            <InputField
              name="title"
              label="Title"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="content"
              label="Content"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <button className="btn-primary col-span-3 mt-2">Add Post</button>
        </div>
      </form>
    </div>
  );
}
