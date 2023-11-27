"use client";

import Loading from "@/app/loading";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import PostItemLayout from "./PostItemLayout";

export default function FeaturedPosts() {
  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";

  const featuredPosts = data.filter((post) => post.featured === true);

  if (loadingFinished) {
    return (
      <section>
        <ul className="grid grid-cols-4 gap-4">
          {featuredPosts.map((post) => (
            <li key={`featuredPost-${post.id}`}>
              <PostItemLayout post={post} />
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return <Loading />;
  }
}
