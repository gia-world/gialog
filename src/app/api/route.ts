import { fsCreatePost, fsGetPostsList } from "@/service/posts";
import type { NextApiResponse } from "next";

export async function GET(req: Request, res: NextApiResponse) {
  const posts = await fsGetPostsList();
  return res.status(200).json(posts);
}

export async function POST(req: Request, res: NextApiResponse) {
  const data = await req.json();
  const result = await fsCreatePost(data);
  return res.status(200).json(result);
}
