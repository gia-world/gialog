import { Post } from "@/types/post";
import React from "react";
import PostItemLayout from "./PostItemLayout";

type Props = {
  posts: Post[];
};

export default function FeaturedPosts({ posts }: Props) {
  const myPicks = [1, 2, 3];
  const featuredPosts = posts.filter((item) =>
    myPicks.includes(Number(item.id))
  );
  return (
    <section>
      <h3>Featured posts</h3>
      <ul>
        {featuredPosts.map((post) => (
          <li key={`featuredPost-${post.id}`}>
            <PostItemLayout post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
