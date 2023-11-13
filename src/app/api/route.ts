import { fsCreatePost, fsGetPostsList } from "@/service/posts";

import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const posts = await fsGetPostsList();
  return res.status(200).json(posts);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);
  const result = await fsCreatePost(data);
  res.status(200).json(result);
}
