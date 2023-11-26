"use client";

import { RootState } from "@/redux/store";
import { Post } from "@/types/post";
import Link from "next/link";
import { useSelector } from "react-redux";
import useFetchData from "./useFetchData";

export default function AllPostsList() {
  //   useFetchData();

  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";

  if (loadingFinished) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {data.map((post: Post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="border p-4 rounded-md">
              <p className="text-lg font-semibold">{post.title}</p>
              <p className="text-gray-500">{post.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return null;
  }
}
