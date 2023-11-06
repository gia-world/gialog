import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { Post } from "@/controller/posts";

const postsDirectory = path.join(process.cwd(), "public/posts");

export async function fsGetPostsList(): Promise<Post[]> {
  const fileNames = await fs.readdir(postsDirectory);
  const postsList = await Promise.all(
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

  return postsList;
}

export async function fsGetPostDetail(id: string): Promise<Post | undefined> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const post = {
      id,
      ...matterResult.data,
      content: matterResult.content,
    } as unknown as Post;
    return post;
  } catch (error) {
    console.error(`Error reading post ${id}: ${error}`);
    return undefined;
  }
}
