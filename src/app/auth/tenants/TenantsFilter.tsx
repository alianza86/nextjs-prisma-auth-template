"use client";

import { Tenant } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  tenantFilterSchema,
  TenantFilterValues,
  userFilterSchema,
  UserFilterValues,
} from "../../../lib/validation";
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
import { TenantSearchParams } from "./page";

export default function TenantsFilter() {
  const searchParams = useSearchParams();
  const params: TenantSearchParams = Object.fromEntries(searchParams);
  const { page, pageSize, ...defaultValues } = params;

  const router = useRouter();

  const form = useForm<TenantFilterValues>({
    mode: "onBlur",
    defaultValues: {
      q: defaultValues.q || "",
    },
    resolver: zodResolver(tenantFilterSchema),
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

  const onSubmit = async (values: TenantFilterValues) => {
    const data: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        data[key] = value;
      }
    });

    const updatedSearchParams = new URLSearchParams(data);

    router.push(`/auth/tenants?${updatedSearchParams.toString()}`);
  };

  async function onClear() {
    reset({
      q: "",
    });

    router.push("/auth/tenants");
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
            name="q"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-8">
                {/* <FormLabel>Search</FormLabel> */}
                <FormControl>
                  <Input placeholder="Search by rfc or name" {...field} />
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
              <Link className="btn-primary" href={"/auth/tenants/create"}>
                <Button variant={"secondary"}>Create New Tenant</Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
