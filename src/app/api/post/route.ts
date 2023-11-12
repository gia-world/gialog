import { fsCreatePost } from "@/service/posts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const result = await fsCreatePost(data);
  return NextResponse.json(result);
}
