import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { NewPost, Post, ApiResponse } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "public/posts");

// export async function fsGetTags() {
//   const result: ApiResponse<Post[]> = await fsGetPostsList();
//   if (result.success && result.data) {
//     const tags: string[] = result.data.reduce(
//       (allTags: string[], post: Post) => {
//         // 각 포스트의 tags 배열을 합침
//         const postTags: string[] = post.tag || []; // 만약 태그가 없는 경우를 대비해 기본값으로 빈 배열 설정
//         return allTags.concat(postTags);
//       },
//       []
//     );
//     const catagories = ["all", ...tags];
//     return catagories;
//   } else {
//     console.error("Error");
//   }
// }

export async function fsGetPostsList(): Promise<ApiResponse<Post[]>> {
  try {
    const fileNames = await fs.readdir(postsDirectory);
    const postsList = await Promise.all(
      fileNames.map(async (fileName) => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, "utf8"); // 비동기 메서드로 변경

        const matterResult = matter(fileContents);

        const result = { id, ...matterResult.data };

        return result as unknown as Post;
      })
    );
    return { success: true, data: postsList };
  } catch (error) {
    return { success: false, error: `Error reading posts list: ${error}` };
  }
}

export async function fsGetPostDetail(id: string): Promise<ApiResponse<Post>> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const post = {
      id,
      ...matterResult.data,
      content: matterResult.content,
    } as unknown as Post;
    return { success: true, data: post };
  } catch (error) {
    console.error(`Error reading post ${id}: ${error}`);
    return { success: false, error: `Error reading post ${id}: ${error}` };
  }
}

export async function fsCreatePost(data: NewPost) {
  const { title, content, createdOn, desc, tag, imgUrl } = data;

  // 마크다운 내용 생성
  const markdownContent = `---
title: "${title}"
createdOn: "${createdOn}"
desc: "${desc}"
tag: ${JSON.stringify(tag)}
imgUrl: "${imgUrl}"
---

${content}`;

  const fileNames = await fs.readdir(postsDirectory);
  const existingIds = fileNames.map((fileName) =>
    Number(fileName.replace(/\.md$/, ""))
  );
  const maxId = Math.max(...existingIds);
  const newId = maxId + 1;

  const fileName = `${newId}.md`;
  const filePath = path.join(postsDirectory, fileName);

  try {
    await fs.writeFile(filePath, markdownContent, "utf-8");
    return {
      success: true,
      message: `Markdown file "${fileName}" created successfully.`,
      data: { ...data, id: newId },
    };
  } catch (error) {
    return { success: false, message: "Creating MD file has failed." };
  }
}

export async function fsUpdatePost(id: string, updatedData: NewPost) {
  const { title, content, createdOn, desc, tag, imgUrl, featured } =
    updatedData;

  const markdownContent = `---
title: "${title}"
createdOn: "${createdOn}"
desc: "${desc}"
tag: ${JSON.stringify(tag)}
imgUrl: "${imgUrl}"
featured: ${Boolean(featured)}
---

${content}`;

  const fileName = `${id}.md`;
  const filePath = path.join(postsDirectory, fileName);

  try {
    await fs.writeFile(filePath, markdownContent, "utf-8");
    return {
      success: true,
      message: `Markdown file "${fileName}" updated successfully.`,
      data: { ...updatedData, id: id },
    };
  } catch (error) {
    return { success: false, message: `Failed to update "${fileName}".` };
  }
}

export async function fsDeletePost(id: string) {
  const fileName = `${id}.md`;
  const filePath = path.join(postsDirectory, fileName);

  try {
    await fs.unlink(filePath);
    return {
      success: true,
      message: `Markdown file "${fileName}" deleted successfully.`,
      data: { id: id },
    };
  } catch (error) {
    return { success: false, message: `Failed to delete "${fileName}".` };
  }
}
