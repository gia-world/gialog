"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  postContent: string;
};

export default function MarkdownRenderer({ postContent }: Props) {
  return <Markdown remarkPlugins={[remarkGfm]}>{postContent}</Markdown>;
}
