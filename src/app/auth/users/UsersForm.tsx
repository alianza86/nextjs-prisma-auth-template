"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createUser, editUser, userExists } from "./actions";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { DynamicInput } from "../../../components/ui/dynamic-input";
import { z } from "zod";
import { requiredString } from "../../../lib/validation";

interface UsersFormProps {
  tenants: Tenant[];
  user?: User;
}

export const createUserSchema = z
  .object({
    tenantId: z.string().uuid(),
    email: requiredString.email(),
    firstName: requiredString,
    lastName: requiredString,
    password: requiredString,
    confirmPassword: requiredString,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ["confirmPassword"],
      });
    }
  });

export type CreateUserValues = z.infer<typeof createUserSchema>;

export default function UsersForm({ tenants, user }: UsersFormProps) {
  const form = useForm<CreateUserValues>({
    mode: "onBlur",
    defaultValues: {
      tenantId: user?.tenantId || "",
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      password: user?.password || "",
      confirmPassword: user?.password || "",
    },
    resolver: zodResolver(createUserSchema),
  });

  const searchParams = useSearchParams().toString();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateUserValues) {
    const exists = await userExists(values.email, user?.email);

    if (exists) {
      setError("email", {
        message: "User already exists!",
      });
      return;
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      if (user) {
        await editUser(user.id, formData, user.password, searchParams);
        return;
      }
      await createUser(formData);
    } catch (error) {
      alert("Something went wrong..."); //toast
    }
  }

  return (
    <section>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-x-4 gap-y-1"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "tenantId",
              type: "select",
              label: "Tenant",
              placeholder: "Select a tenant",
              asyncOptions: { idField: "id", displayValues: ["name"] },
              options: tenants,
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "Your email",
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "firstName",
              type: "text",
              label: "First Name",
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "lastName",
              type: "text",
              label: "Last Name",
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "password",
              type: "password",
              label: "Password",
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-6"
            config={{
              name: "confirmPassword",
              type: "password",
              label: "Confirm Password",
            }}
          />
          <div className="col-span-12 space-x-3">
            <Button type="button" variant="secondary" asChild tabIndex={-1}>
              <Link href={`/auth/users?${searchParams}`}>Go Back</Link>
            </Button>
            <Button disabled={isSubmitting} className="mt-3">
              {isSubmitting && (
                <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
              )}
              {user ? "Modify User" : "Create User"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
