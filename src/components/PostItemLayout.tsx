import { Post } from "@/service/posts";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: Post;
};

export default function PostItemLayout({ post }: Props) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="rounded-md shadow-md border">
        <div className="relative w-full h-20">
          <Image src={post.imgUrl} alt={post.title} fill />
        </div>
        <div>
          <p>{post.createdOn}</p>
          <p>{post.title}</p>
          <p>{post.desc}</p>
          <ul>
            {post.tag.map((tag, i) => (
              <li key={`tag-${i}`}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
