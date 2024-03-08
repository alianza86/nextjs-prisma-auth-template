import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { config } from "../../../lib/auth";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const newPost = await db.post.create(data);

  return NextResponse.json(newPost);
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(config);
  console.log(session);

  const posts = await db.post.findMany();

  return NextResponse.json(posts);
}
