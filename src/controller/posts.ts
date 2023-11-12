import { fsCreatePost, fsGetPostDetail, fsGetPostsList } from "@/service/posts";
import { CreatePost, Post } from "@/types/post";

export async function getPostsList(): Promise<Post[]> {
  const data = await fsGetPostsList();
  return data;
}

export async function getPostDetail(id: string): Promise<Post | undefined> {
  const data = await fsGetPostDetail(id);
  return data;
}

export async function createPost(data: CreatePost) {
  await fsCreatePost(data);
  console.log(data, "서버");
}
