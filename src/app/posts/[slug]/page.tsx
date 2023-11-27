"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Post } from "@/types/post";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostDetailPage({ params: { slug } }: Props) {
  const router = useRouter();
  const [post, setPost] = useState<Post>();

  async function handleDelete() {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      const response = await axios.delete(`/api/post/${slug}`);
      console.log(response.data);
      router.push("/posts");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/post/${slug}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch posts list");
      }
      console.log(response.data);
      setPost(response.data);
    };
    fetchData();
  }, [slug]);
  if (post) {
    return (
      <section>
        <div className="flex gap-4 justify-end">
          <Link href={`/posts/${post.id}/edit`}>
            <button className="button">수정</button>
          </Link>
          <button className="button" onClick={handleDelete}>
            삭제
          </button>
        </div>
        <div className="mb-8">
          <h2 className="title">{post && post.title}</h2>
          <div className="flex justify-between mb-4">
            <ul className="flex gap-2">
              {post.tag.map((tag, i) => (
                <li
                  key={`tag-${i}`}
                  className="bg-rose-200 rounded-xl px-2 text-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <p className="text-sm">{post.createdOn}</p>
          </div>
          <MarkdownRenderer postContent={post.content} />
        </div>
        <div className="text-end">
          <Link href={"/posts"}>
            <button className="button">목록</button>
          </Link>
        </div>
      </section>
    );
  }
}
