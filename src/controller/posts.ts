import { fsGetPostDetail, fsGetPostsList } from "@/service/posts";

export type Post = {
  id: string;
  title: string;
  createdOn: string;
  desc: string;
  tag: string[];
  imgUrl: string;
  content?: string;
};

// 리스트 데이터 받아오기
export async function getPostsList(): Promise<Post[]> {
  const data = await fsGetPostsList();
  return data;
}

export async function getPostDetail(id: string): Promise<Post | undefined> {
  const data = await fsGetPostDetail(id);
  return data;
}
