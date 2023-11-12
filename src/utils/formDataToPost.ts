import { Post } from "@/controller/posts";

export default function formDataToPost(formData: FormData): Partial<Post> {
  const post: any = {};
  formData.forEach((value, key) => {
    if (["title", "desc", "tag", "content"].includes(key)) {
      post[key] = key === "tag" ? (value as String).split(",") : value;
    }
  });
  return post as Partial<Post>;
}
