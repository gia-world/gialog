import { fsCreatePost, fsGetPostDetail, fsGetPostsList } from "@/service/posts";
import { CreatePost, Post } from "@/types/post";
import { NextResponse } from "next/server";

// export async function getPostsList(): Promise<Post[]> {
//   const data = await fsGetPostsList();
//   return data;
// }

// export async function getPostDetail(id: string): Promise<Post | undefined> {
//   const data = await fsGetPostDetail(id);
//   return data;
// }

// export async function createPost(data: CreatePost) {
//   // const result = await fsCreatePost(data);
//   // console.log(data, "서버");
//   // return result;
//   const fileName = await fsCreatePost(data);
//   return {
//     success: true,
//     fileName,
//   };
// }

// route.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log(req.url, "ㅣㅣㅣㅣㅣㅣ");
//   if (req.method === "GET") {
//     const posts = await fsGetPostsList();
//     return res.status(200).json(posts);
//   }
//   if (req.method === "POST") {
//     const data = JSON.parse(req.body);
//     const result = await fsCreatePost(data);
//     res.status(200).json(result);
//   } else {
//     res.status(405).json({
//       error: "Method not allowed",
//     });
//   }
//   res.status(200);
// }
// route.js

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const posts = await fsGetPostsList();
  return res.status(200).json(posts);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = JSON.parse(req.body);
  const result = await fsCreatePost(data);
  res.status(200).json(result);
}

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req.url);

//   if (req.method === "GET") {
//     return GET(req, res);
//   } else if (req.method === "POST") {
//     return POST(req, res);
//   } else {
//     res.status(405).json({
//       error: "Method not allowed",
//     });
//   }
// }
