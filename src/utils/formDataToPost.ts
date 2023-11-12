import { CreatePost } from "@/types/post";

export default function formDataToPost(formData: FormData): CreatePost {
  const post: any = {};
  formData.forEach((value, key) => {
    if (["title", "desc", "tag", "content"].includes(key)) {
      post[key] = key === "tag" ? (value as String).split(",") : value;
    }
  });
  return post as CreatePost;
}
