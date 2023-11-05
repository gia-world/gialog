import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPost } from "@/service/posts";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

async function PostDetailPage({ params }: Props) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post || !post.content) {
    notFound();
  } else {
    return (
      <>
        디테일 페이지 slug: {slug}
        <MarkdownRenderer postContent={post.content} />
      </>
    );
  }
}

export default PostDetailPage;
