"use client";

import { RootState } from "@/redux/store";
import { Post } from "@/types/post";
import React from "react";
import { useSelector } from "react-redux";
import PostItemLayout from "./PostItemLayout";

export default function FeaturedPosts() {
  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";
  // const myPicks = [1, 2, 3];

  const myPicks: Number[] = [];
  const existingIds = data.map((item) => Number(item.id));

  while (myPicks.length < 3) {
    const randomIndex = Math.floor(Math.random() * existingIds.length);
    const randomId = existingIds[randomIndex];

    if (!myPicks.includes(randomId)) {
      myPicks.push(randomId);
    }
  }

  const featuredPosts = data.filter((item) =>
    myPicks.includes(Number(item.id))
  );
  if (loadingFinished) {
    return (
      <section>
        <ul className="grid grid-cols-3 gap-4">
          {featuredPosts.map((post) => (
            <li key={`featuredPost-${post.id}`}>
              <PostItemLayout post={post} />
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return null;
  }
}
