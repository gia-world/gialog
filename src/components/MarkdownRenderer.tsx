"use client";

import { Post } from "@/service/posts";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  postContent: string;
};

export default function MarkdownRenderer({ postContent }: Props) {
  // const [markdownContent, setMarkdownContent] = useState("");

  // useEffect(() => {
  //   const markdownFilePath = `/posts/${post.fileUrl}`;
  //   fetch(markdownFilePath)
  //     .then((response) => response.text())
  //     .then((data) => setMarkdownContent(data));
  // }, []);

  // return <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>;
  return <Markdown remarkPlugins={[remarkGfm]}>{postContent}</Markdown>;
}
