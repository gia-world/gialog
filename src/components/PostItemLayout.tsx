import { Post } from "@/types/post";
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
        <div className="relative w-full h-40">
          <Image
            src={post.imgUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
        <div className="p-4">
          <p className="text-end text-sm">{post.createdOn}</p>
          <p className="font-semibold text-lg">{post.title}</p>
          <p className="text-ellipsis">{post.desc}</p>
          <ul className="flex gap-2 mt-2">
            {post.tag.map((tag, i) => (
              <li
                key={`tag-${i}`}
                className="bg-rose-200 rounded-xl px-2 text-sm"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}
