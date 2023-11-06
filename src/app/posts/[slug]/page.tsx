import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPostDetail } from "@/service/posts";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

async function PostDetailPage({ params: { slug } }: Props) {
  const post = await getPostDetail(slug);
  console.log(post);

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
