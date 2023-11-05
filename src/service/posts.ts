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
  // fileUrl?: string;
  content?: string;
};

export async function getPostsData(): Promise<Post[]> {
  // Get file names under /posts
  const postsDirectory = path.join(process.cwd(), "public/posts");
  const fileNames = await fs.readdir(postsDirectory); // 비동기 메서드로 변경

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8"); // 비동기 메서드로 변경

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      // return {
      //   id,
      //   ...matterResult.data,
      // };

      //? 이렇게 일일이 확인하는 것이 최선일까?
      const tag = Array.isArray(matterResult.data.tag)
        ? matterResult.data.tag
        : typeof matterResult.data.tag === "string"
        ? [matterResult.data.tag]
        : [];

      return {
        id,
        title: matterResult.data.title || "", // Ensure that title is present
        createdOn: matterResult.data.createdOn || "", // Ensure that createdOn is present
        desc: matterResult.data.desc || "", // Ensure that desc is present
        tag,
        imgUrl: matterResult.data.imgUrl || "", // Ensure that imgUrl is present
        content: matterResult.content || "", //? 이렇게 내용을 전체로 보내는 것이 적절한가?
      };
    })
  );

  return allPostsData;
}

export async function getPosts(): Promise<Post[]> {
  // const filePath = path.join(process.cwd(), "data", "posts.json");
  // const data = await fs.readFile(filePath, "utf-8");

  const data1 = await getPostsData();
  // console.log(data1, "data1");

  // return JSON.parse(data);
  return data1;
}

export async function getPost(id: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((item) => item.id === id);
}
