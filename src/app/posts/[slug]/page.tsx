import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getPost } from "@/service/posts";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

async function PostDetailPage({ params: { slug } }: Props) {
  // const { slug } = params;

  //? 여기서 다시 포스트를 받아오는게 효율적인가?
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
