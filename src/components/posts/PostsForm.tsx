"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import { CreatePostSchema, CreatePostValues } from "../../lib/validation";
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
import { createPost, editPost } from "../../app/posts/actions";

interface PostsFormProps {
  post?: Post;
}

export default function PostsForm({ post }: PostsFormProps) {
  const form = useForm<CreatePostValues>({
    mode: "onBlur",
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
    resolver: zodResolver(CreatePostSchema),
  });

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
        await editPost(post.id, formData);
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
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="The post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-12">
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Your content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-12 space-x-3">
            <Link href="/posts">
              <Button type="button" variant="outline">
                Go Back
              </Button>
            </Link>
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
