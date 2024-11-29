"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createPost, editPost } from "./actions";
import { Form } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { z } from "zod";
import { requiredString } from "../../lib/validation";
import { DynamicInput } from "../../components/ui/dynamic-input";

interface PostsFormProps {
  post?: Post;
}

export const CreatePostSchema = z.object({
  title: requiredString,
  content: requiredString,
});

export type CreatePostValues = z.infer<typeof CreatePostSchema>;

export default function PostsForm({ post }: PostsFormProps) {
  const form = useForm<CreatePostValues>({
    mode: "onBlur",
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
    resolver: zodResolver(CreatePostSchema),
  });

  const searchParams = useSearchParams().toString();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreatePostValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      if (post) {
        await editPost(post.id, formData, searchParams);
        return;
      }
      await createPost(formData);
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
            className="col-span-12 md:col-span-12"
            config={{
              name: "title",
              type: "text",
              label: "Title",
            }}
          />
          <DynamicInput
            control={control}
            className="col-span-12 md:col-span-12"
            config={{
              name: "content",
              type: "textarea",
              label: "Content",
              lines: 5,
            }}
          />

          <div className="col-span-12 space-x-3">
            <Button type="button" variant="outline" tabIndex={-1} asChild>
              <Link href={`/posts?${searchParams}`}>Go Back</Link>
            </Button>
            <Button disabled={isSubmitting} className="mt-3">
              {isSubmitting && (
                <Loader2 className=" mr-2 w-4 h-4 animate-spin" />
              )}
              {post ? "Modify Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
