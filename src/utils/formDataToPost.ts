import { NewPost } from "@/types/post";

export default function formDataToPost(formData: FormData): NewPost {
  const post: any = {};
  formData.forEach((value, key) => {
    if (["title", "desc", "tag", "content"].includes(key)) {
      post[key] = key === "tag" ? (value as String).split(",") : value;
    }
  });
  return post as NewPost;
}
