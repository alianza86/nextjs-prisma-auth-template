"use client";

import { Post } from "@prisma/client";
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
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { PostSearchParams } from "./page";
import { postFilterSchema, PostFilterValues } from "../../lib/validation";

export default function PostsFilter() {
  const searchParams = useSearchParams();
  const params: PostSearchParams = Object.fromEntries(searchParams);
  const { page, pageSize, ...defaultValues } = params;

  const router = useRouter();

  const form = useForm<PostFilterValues>({
    mode: "onBlur",
    defaultValues: {
      q: defaultValues.q || "",
    },
    resolver: zodResolver(postFilterSchema),
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

  const onSubmit = async (values: PostFilterValues) => {
    const data: any = {};

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        data[key] = value;
      }
    });

    const updatedSearchParams = new URLSearchParams(data);

    router.push(`/posts?${updatedSearchParams.toString()}`);
  };

  async function onClear() {
    reset({
      q: "",
    });

    router.push("/posts");
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
                  <Input placeholder="Search by title or content" {...field} />
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
              <Button
                onClick={onClear}
                variant={"secondary"}
                type="button"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
                )}
                Reset Filters
              </Button>
            </div>
            <div>
              <Link className="btn-primary" href={"/posts/create"}>
                <Button variant={"default"}>Create New Post</Button>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
