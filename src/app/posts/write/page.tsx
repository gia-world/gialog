import CreateForm from "@/components/CreateForm";
import { createPost, Post } from "@/controller/posts";

function today() {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return dateString;
}

function formDataToPost(formData: FormData): Post {
  const post: any = {};
  formData.forEach((value, key) => {
    if (["title", "desc", "tag", "content"].includes(key)) {
      post[key] = key === "tag" ? (value as String).split(",") : value;
    }
  });
  return post as Post;
}

export default function WritePost() {
  async function create(formData: FormData) {
    "use server";
    console.log(formData, "formdata");
    const post = formDataToPost(formData);
    console.log(post, "formdatatopost");
    createPost({
      ...post,
      createdOn: String(today()),
      imgUrl: "https://source.unsplash.com/random",
    });
  }

  return (
    <section>
      <h2>포스트 작성</h2>
      <form action={create}>
        <label className="flex gap-2">
          <span>title</span>
          <input defaultValue="test" name="title" className="flex-1" />
        </label>
        <label className="flex gap-2">
          <span>desc</span>
          <input defaultValue="test" name="desc" className="flex-1" />
        </label>
        <label className="flex gap-2">
          <span>tag</span>
          <input defaultValue="test" name="tag" className="flex-1" />
        </label>
        <label className="flex gap-2">
          <span>content</span>
          <textarea defaultValue="test" name="content" className="flex-1" />
        </label>

        <input type="submit" />
      </form>
      {/* <CreateForm /> */}
    </section>
  );
}
