"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant } from "@prisma/client";
import { CreateTenantValues, createTenantSchema } from "../../lib/validation";
import {
  createTenant,
  editTenant,
  tenantExists,
} from "../../app/auth/tenants/actions";
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
import Link from "next/link";

interface TenantsFormProps {
  tenant?: Tenant;
}

export default function TenantsForm({ tenant }: TenantsFormProps) {
  const form = useForm<CreateTenantValues>({
    mode: "onBlur",
    defaultValues: {
      rfc: tenant?.rfc || "",
      name: tenant?.name || "",
    },
    resolver: zodResolver(createTenantSchema),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateTenantValues) {
    const exists = await tenantExists(values.rfc, tenant?.rfc);

    if (exists) {
      setError("rfc", {
        message: "Tenant already exists!",
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
      if (tenant) {
        await editTenant(tenant.id, formData);
        return;
      }
      await createTenant(formData);
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
            name="rfc"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>RFC</FormLabel>
                <FormControl>
                  <Input placeholder="Your rfc" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-12 md:col-span-6">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-12 space-x-3">
            <Link href="/auth/tenants">
              <Button type="button" variant="outline">
                Go Back
              </Button>
            </Link>
            <Button disabled={isSubmitting} className="mt-3">
              {isSubmitting && (
                <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
              )}
              {tenant ? "Modify Tenant" : "Create Tenant"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
