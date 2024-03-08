"use client";

import InputField from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function NewTenant() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/auth/tenants", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.refresh();
    }
  });

  return (
    <div className="my-8">
      <form action="" onSubmit={onSubmit}>
        <div className="formContainer w-1/2">
          <div>
            <InputField
              name="rfc"
              label="RFC"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              name="name"
              label="Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <button className="btn-primary">Add Tenant</button>
        </div>
      </form>
    </div>
  );
}
