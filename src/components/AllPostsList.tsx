"use client";

import Loading from "@/app/loading";
import { updatePost } from "@/redux/posts/actions";
import { RootState, useAppDispatch } from "@/redux/store";
import { Post } from "@/types/post";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { fetchAllPostsData } from "../redux/posts/actions";
import Categories from "./Categories";

export default function AllPostsList() {
  const dispatch = useAppDispatch();

  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";

  const [posts, setPosts] = useState(data ?? []);
  const categories = ["all", ...new Set(posts.flatMap((post) => post.tag))];

  const selected: string | null = useSearchParams().get("category");
  const filteredPost =
    !selected || selected === "all"
      ? posts
      : posts.filter((post) => post.tag.includes(selected));

  async function handleToggleFeatured(id: string) {
    console.log("toggle", id);
    // setPosts(
    //   produce((draft) => {
    //     const targetPost = draft.find((post) => post.id === id);
    //     if (targetPost) {
    //       targetPost.featured = !targetPost.featured;
    //     }
    //   })
    // );
    const targetPost = posts.find((post) => post.id === id);
    const payload = targetPost && {
      ...targetPost,
      featured: !targetPost.featured,
    };
    console.log(payload, "payload");
    try {
      const response = await axios.put(`/api/post/${id}`, payload);

      if (response && response.status === 200) {
        const { data } = response.data;
        console.log(data, "response.data");
        dispatch(updatePost(id, data));
      } else {
        console.error("Failed to dispatch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    console.log("use effect-fetch");
    dispatch(fetchAllPostsData());
  }, [dispatch]);

  useEffect(() => {
    console.log("use effect-data");
    setPosts(data);
  }, [data]);

  if (loadingFinished) {
    return (
      <div>
        <Categories categories={categories} />
        <div className="grid grid-cols-1 gap-4">
          {filteredPost.map((post: Post) => (
            <div
              className="border p-4 rounded-md flex justify-between items-start max-h-[86px]"
              key={post.id}
            >
              <Link href={`/posts/${post.id}`} className="flex gap-4">
                <div className="w-[52px] h-[52px] relative">
                  <Image
                    src={post.imgUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">{post.title}</p>
                  <p className="text-gray-500">{post.desc}</p>
                </div>
              </Link>
              <button onClick={() => handleToggleFeatured(post.id)}>
                {post.featured ? <BsStarFill /> : <BsStar />}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
}
