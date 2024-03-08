"use client";

import { useForm } from "react-hook-form";
import InputField from "../../../components/InputField";
import { useRouter } from "next/navigation";
import SelectField from "../../../components/SelectField";
import { createUser } from "./users";

export default function UsersForm({ tenants }: { tenants: any[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const { confirmPassword: _, ...serverData } = data;

    const newUser = await createUser(serverData);
    reset();
    router.refresh();
  });

  return (
    <div className="my-8">
      <form onSubmit={onSubmit}>
        <div className="formContainer">
          <div className="col-span-6">
            <SelectField
              name="tenantId"
              label="Tenant"
              selectOptions={tenants.map((tenant) => ({
                value: tenant.id,
                label: tenant.name,
              }))}
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="email"
              label="Email"
              type="email"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="firstName"
              label="First Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="lastName"
              label="Last Name"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="password"
              label="Password"
              type="password"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              validations={{ required: true }}
              register={register}
              errors={errors}
            />
          </div>
          <button className="btn-primary col-span-3 mt-2">Add User</button>
        </div>
      </form>
    </div>
  );
}
