import { fsCreatePost, fsGetPostDetail, fsGetPostsList } from "@/service/posts";

export type Post = {
  id: string;
  title: string;
  createdOn: string;
  desc: string;
  tag: string[];
  imgUrl: string;
  content?: string;
};

export async function getPostsList(): Promise<Post[]> {
  const data = await fsGetPostsList();
  return data;
}

export async function getPostDetail(id: string): Promise<Post | undefined> {
  const data = await fsGetPostDetail(id);
  return data;
}

export async function createPost(data: any) {
  await fsCreatePost(data);
  console.log(data, "서버");
}
