import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPostDetail } from "@/controller/posts";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPostDetail(slug);

  if (!post || !post.content) {
    notFound();
  } else {
    return (
      <>
        <div className="bg-amber-200">{post.title}</div>
        <MarkdownRenderer postContent={post.content} />
      </>
    );
  }
}
