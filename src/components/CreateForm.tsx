"use client";

import { createPost, updatePost } from "@/redux/posts/actions";
import { RootState, useAppDispatch } from "@/redux/store";
import { NewPost, Post } from "@/types/post";
import today from "@/utils/today";
import axios from "axios";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsX } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function CreateForm({ id }: { id?: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewPost>();
  const onSubmit: SubmitHandler<NewPost> = async (data) => {
    const payload = {
      ...data,
      tag: tagsArray,
      createdOn: today(),
      imgUrl: "https://source.unsplash.com/random",
    };

    try {
      let response;
      if (id) {
        response = await axios.put(`/api/post/${id}`, payload);
      } else {
        response = await axios.post("/api/post", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      if (response && response.status === 200) {
        const { data } = response.data;
        console.log(data, "response.data");
        if (id) {
          dispatch(updatePost(id, data));
        } else {
          dispatch(createPost(data));
        }

        window.alert(`${id ? "수정" : "작성"}이 완료되었습니다.`);
        router.push("/");
      } else {
        console.error("Failed to create file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      console.log(id);
      const fetchData = async () => {
        const response = await axios.get(`/api/post/${id}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch posts list");
        }
        console.log(response.data);
        setPost(response.data);
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      console.log(post, "post");
      setValue("title", post.title);
      setValue("desc", post.desc);
      setValue("content", post.content);
      setTagsArray(post.tag);
    }
  }, [post, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="flex gap-2">
        <span>title</span>
        <input defaultValue="test" {...register("title")} className="flex-1" />
      </label>
      <label className="flex gap-2">
        <span>desc</span>
        <input defaultValue="test" {...register("desc")} className="flex-1" />
      </label>
      <label className="flex gap-2">
        <span>Tags</span>
        <input
          placeholder="Enter tags and press Enter"
          {...register("tag")}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              const tagInput = (e.target as HTMLInputElement).value.trim();
              if (tagInput !== "") {
                setTagsArray((prevTags) => [...prevTags, tagInput]);
                (e.target as HTMLInputElement).value = "";
              }
            }
          }}
        />
      </label>
      <div className="flex gap-2">
        {tagsArray.map((tag, index) => (
          <div key={index} className="tag flex">
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => {
                setTagsArray((prevTags) =>
                  prevTags.filter((_, i) => i !== index)
                );
              }}
            >
              <BsX />
            </button>
          </div>
        ))}
      </div>
      <label className="flex gap-2">
        <span>content</span>
        <textarea
          defaultValue="test"
          {...register("content")}
          className="flex-1"
        />
      </label>
      <input type="submit" />
    </form>
  );
}
