"use client";

import { Tenant } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import SelectCustom from "../../../components/ui/select-custom";
import { Input } from "../../../components/ui/input";
import { SearchParams } from "./page";
import { z } from "zod";
import { DynamicInput } from "../../../components/ui/dynamic-input";

interface UserFilterProps {
  tenants: Tenant[];
}

export const userFilterSchema = z.object({
  q: z.string().optional(),
  tenantId: z.string().optional(),
});

export type UserFilterValues = z.infer<typeof userFilterSchema>;

export default function UsersFilter({ tenants }: UserFilterProps) {
  const searchParams = useSearchParams();
  const params: SearchParams = Object.fromEntries(searchParams);
  const { page, pageSize, ...defaultValues } = params;

  const router = useRouter();

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

  // useEffect(() => {
  //   const subscription = watch(() => handleSubmit(onSubmit)());
  //   return () => subscription.unsubscribe();
  // }, [handleSubmit, watch]);

  const onSubmit = async (values: UserFilterValues) => {
    const data: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        data[key] = value;
      }
    });

    const updatedSearchParams = new URLSearchParams(data);

    router.push(`/auth/users?${updatedSearchParams.toString()}`);
  };

  async function onClear() {
    reset({
      tenantId: "",
      q: "",
    });

    router.push("/auth/users");
  }

  return (
    <section>
      <Form {...form}>
        <form
          className="grid grid-cols-12 gap-x-4 gap-y-1 items-end"
          noValidate
          key={JSON.stringify(defaultValues)}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-4"
            config={{
              name: "tenantId",
              type: "select",
              options: tenants,
              placeholder: "All Tenants",
              asyncOptions: { idField: "id", displayValues: ["name"] },
              emptyOption: true,
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-8"
            config={{
              name: "q",
              type: "text",
              placeholder: "Search by email, first name or last name",
            }}
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
              <Link className="btn-primary" href={"/auth/users/create"}>
                <Button variant={"secondary"}>Create New User</Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
