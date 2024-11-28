"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant, User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createUserSchema, CreateUserValues } from "../../../lib/validation";
import { createUser, editUser, userExists } from "./actions";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface UsersFormProps {
  tenants: Tenant[];
  user?: User;
}

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
          <FormField
            control={control}
            name="tenantId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Tenant</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={user?.tenantId || field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenants.map(({ id, name }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    {...field}
                    // defaultValue={user?.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 space-x-3">
            <Link href={`/auth/users?${searchParams}`}>
              <Button type="button" variant="secondary">
                Go Back
              </Button>
            </Link>
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
