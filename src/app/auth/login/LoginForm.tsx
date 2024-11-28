"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tenant, User } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginSchema, loginValues } from "../../../lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const router = useRouter();

  const form = useForm<loginValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: loginValues) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!res?.ok) {
      setErrorMessage(res?.error);
      return;
    }

    router.push("/posts");
    router.refresh();
  }

  return (
    <section>
      <Form {...form}>
        <form
          className="w-full md:w-1/2 mx-auto grid grid-cols-12 gap-x-4 gap-y-1"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-12 space-x-3">
            <Button disabled={isSubmitting} className="mt-3">
              {isSubmitting && (
                <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
              )}
              Login
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
