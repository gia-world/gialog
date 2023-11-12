"use client";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Post } from "@/types/post";
import axios from "axios";
import { useEffect, useState } from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostDetailPage({ params: { slug } }: Props) {
  const [post, setPost] = useState<Post>();
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
  }, []);

  return (
    <>
      <div className="bg-amber-200">{post && post.title}</div>
      {post && <MarkdownRenderer postContent={post.content} />}
    </>
  );
}
