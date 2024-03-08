"use client";

import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function PostsForm({ create }: { create: any }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const newPost = await create(data);
    router.refresh();
  });

  return (
    <div className="my-8">
      <form action="" onSubmit={onSubmit}>
        <div className="formContainer w-2/3">
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
          <button className="btn-primary">Add Post</button>
        </div>
      </form>
    </div>
  );
}
