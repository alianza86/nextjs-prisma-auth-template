"use client";

import InputField from "../../../components/InputField";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createTenant } from "./tenants";

export default function TenantsForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const newTenant = await createTenant(data);
    router.refresh();
  });

  return (
    <div className="my-8">
      <form action="" onSubmit={onSubmit}>
        <div className="formContainer">
          <div className="col-span-6">
            <InputField
              name="rfc"
              label="RFC"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="name"
              label="Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <button className="btn-primary col-span-3 mt-2">Add Tenant</button>
        </div>
      </form>
    </div>
  );
}
