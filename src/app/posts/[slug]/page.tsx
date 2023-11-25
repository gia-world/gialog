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
      router.push("/");
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
      <>
        <div className="flex gap-4 justify-end">
          <Link href={`/posts/${post.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div className="bg-amber-200">{post && post.title}</div>
        <MarkdownRenderer postContent={post.content} />
      </>
    );
  }
}
