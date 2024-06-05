"use client";

import { Tenant } from "@prisma/client";
import { UserFilterValues, userFilterSchema } from "../../lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterUsers } from "../../app/auth/users/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import SelectCustom from "../ui/select-custom";
import Link from "next/link";

interface UserFilterProps {
  defaultValues: UserFilterValues;
  tenants: Tenant[];
}

export default function UsersFilter({
  defaultValues,
  tenants,
}: UserFilterProps) {
  const form = useForm<UserFilterValues>({
    mode: "onBlur",
    defaultValues: {
      tenantId: defaultValues.tenantId || "",
      q: defaultValues.q || "",
    },
    resolver: zodResolver(userFilterSchema),
  });

  const {
    handleSubmit,
    control,
    setError,
    reset,
    watch,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UserFilterValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await filterUsers(formData);
    } catch (error) {
      alert("Something went wrong..."); //toast
    }
  };

  // useEffect(() => {
  //   const subscription = watch(() => handleSubmit(onSubmit)());
  //   return () => subscription.unsubscribe();
  // }, [watch, handleSubmit]);

  async function onClear() {
    reset();
    const formData = new FormData();
    try {
      await filterUsers(formData);
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
          key={JSON.stringify(defaultValues)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="tenantId"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-4">
                {/* <FormLabel>Tenant</FormLabel> */}
                <FormControl>
                  <SelectCustom {...field}>
                    <option value="">All Tenants</option>
                    {tenants.map((tenant) => (
                      <option key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </option>
                    ))}
                  </SelectCustom>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="q"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-8">
                {/* <FormLabel>Search</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Search by email, first name or last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-12 flex justify-between items-center mt-4">
            <div className="flex items-center gap-3">
              <Button disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
                )}
                Search
              </Button>
              <Button onClick={onClear} type="button" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
                )}
                Reset Filters
              </Button>
            </div>
            <div>
              <Link className="btn-primary" href="/auth/users/create">
                <Button variant={"outline"}>Create New User</Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
