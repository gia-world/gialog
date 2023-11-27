import { NewPost, Post } from "@/types/post";

export default function formDataToPost(formData: FormData): NewPost {
  const post: Record<string, any> = {};
  // string => key, any => value == {}의 타입
  // const post: FormDataToPost = {
  //   title: "",
  //   desc: "",
  //   tag: [],
  //   content: "",
  // };
  formData.forEach((value, key) => {
    if (["title", "desc", "tag", "content"].includes(key)) {
      // const v = key as "title" | "desc" | "tag" | "content";
      // post[v] = v === "tag" ? (value as String).split(",") : value;
      if (key === "tag") {
        post[key] = (value as String).split(",");
      } else if (key === "title") {
        post[key] = value;
      }
    }
  });
  return post as NewPost;
}
