import {
  fsDeletePost,
  fsGetPostDetail,
  fsGetPostsList,
  fsUpdatePost,
} from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const postId = params.slug;
  try {
    const res = await fsGetPostDetail(postId);

    if (res.success) {
      return NextResponse.json(res.data);
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const postId = params.slug;
  const data = await req.json();

  const result = await fsUpdatePost(postId, data);
  return NextResponse.json(result);
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const postId = params.slug;

  const result = await fsDeletePost(postId);
  return NextResponse.json(result);
}
