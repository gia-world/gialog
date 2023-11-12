import { fsGetPostDetail, fsGetPostsList } from "@/service/posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const res = await fsGetPostsList();

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
