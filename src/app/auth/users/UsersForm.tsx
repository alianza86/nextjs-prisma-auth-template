"use client";

import { useFormState } from "react-dom";
import InputField from "../../../components/InputField";
import SelectField from "../../../components/SelectField";
import { createUser, editUser } from "../../actions";
import { ZodFormattedError } from "zod";
import { User } from "@prisma/client";

const EMPTY_STATE: {
  errors: ZodFormattedError<any, string>;
  message: string | null;
} = {
  errors: {
    _errors: [],
  },
  message: null,
};

export default function UsersForm({
  tenants,
  user,
}: {
  tenants: any[];
  user: User | null;
}) {
  const [state, formAction] = useFormState(createUser, EMPTY_STATE);
  const [editState, editFormAction] = useFormState(
    editUser.bind(user),
    EMPTY_STATE
  );

  return (
    <div className="my-8">
      <form action={formAction}>
        <div className="formContainer">
          <div className="col-span-6">
            <SelectField
              name="tenantId"
              label="Tenant"
              defaultValue={user?.tenantId}
              selectOptions={tenants.map((tenant) => ({
                value: tenant.id,
                label: tenant.name,
              }))}
              errors={state?.errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="email"
              label="Email"
              type="email"
              defaultValue={user?.email}
              errors={state?.errors || null}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="firstName"
              label="First Name"
              defaultValue={user?.firstName}
              errors={state?.errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="lastName"
              label="Last Name"
              defaultValue={user?.lastName}
              errors={state?.errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="password"
              label="Password"
              type="password"
              errors={state?.errors}
            />
          </div>
          <div className="col-span-6">
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              errors={state?.errors}
            />
          </div>
          {!user && (
            <button className="btn-primary col-span-2 mt-2">Add User</button>
          )}
          {user && (
            <button className="btn-primary col-span-2 mt-2">Edit User</button>
          )}
        </div>
        {state.message && <span className="errorMessage">{state.message}</span>}
      </form>
    </div>
  );
}
