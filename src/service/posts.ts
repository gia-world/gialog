import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

export type Post = {
  id: string;
  title: string;
  createdOn: string;
  desc: string;
  tag: string[];
  imgUrl: string;
  content?: string;
};

// 리스트 목록 DB 화 시키기
export async function getAllPostData(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "public/posts");
  // Get file names under /posts
  const fileNames = await fs.readdir(postsDirectory); // 비동기 메서드로 변경

  const allPostsListData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8"); // 비동기 메서드로 변경

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      const result = { id, ...matterResult.data };

      return result as unknown as Post;
    })
  );

  return allPostsListData;
}

// 리스트 데이터 받아오기
export async function getPostsList(): Promise<Post[]> {
  const data = await getAllPostData();
  return data;
}

// 디테일 데이터 받아오기
export async function getPostDetail(id: string): Promise<Post | undefined> {
  const posts = await getPostsList();
  return posts.find((item) => item.id === id);
}
