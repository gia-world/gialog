"use client";

import { updatePost } from "@/redux/posts/actions";
import { RootState, useAppDispatch } from "@/redux/store";
import { Post } from "@/types/post";
import axios from "axios";
import { produce } from "immer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import useFetchData from "./useFetchData";
import { fetchAllPostsData } from "../redux/posts/actions";
import Image from "next/image";

export default function AllPostsList() {
  const dispatch = useAppDispatch();

  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";

  const [isFeatured, setIsFeatured] = useState(false);
  const [posts, setPosts] = useState(data ?? []);
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
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: Post) => (
          <div
            className="border p-4 rounded-md flex justify-between items-start max-h-[86px]"
            key={post.id}
          >
            <Link href={`/posts/${post.id}`} className="flex gap-4">
              <div className="w-[52px] h-[52px] overflow-hidden">
                <Image
                  src={post.imgUrl}
                  alt={post.title}
                  width={52}
                  height={52}
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
    );
  } else {
    return null;
  }
}
