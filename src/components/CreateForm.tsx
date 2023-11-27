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
      let postId;
      if (response && response.status === 200) {
        const { data } = response.data;
        console.log(data, "response.data");
        if (id) {
          dispatch(updatePost(id, data));
          postId = id;
        } else {
          dispatch(createPost(data));
          postId = data.id;
        }

        window.alert(`${id ? "수정" : "작성"}이 완료되었습니다.`);
        router.push(`/posts/${postId}`);
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
    <>
      <h2 className="title">{id ? "Edit Post" : "New Post"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <label className="form-label">
          <span className="form-name">Title</span>
          <input
            defaultValue="test"
            {...register("title")}
            className="form-input"
          />
        </label>
        <label className="form-label">
          <span className="form-name">Desc</span>
          <input
            defaultValue="test"
            {...register("desc")}
            className="form-input"
          />
        </label>
        <label className="form-label">
          <span className="form-name">Tags</span>
          <input
            placeholder="Enter tags and press Enter or type comma(,)."
            {...register("tag")}
            className="form-input"
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
        {tagsArray.length > 0 && (
          <div className="flex gap-2">
            {tagsArray.map((tag, index) => (
              <div
                key={index}
                className="tag flex gap-1 bg-rose-200 rounded-xl px-2"
              >
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
        )}
        <label className="form-label">
          <span className="form-name">Content</span>
          <textarea
            defaultValue="test"
            {...register("content")}
            className="form-input"
          />
        </label>
        <input type="submit" className="button self-center" />
      </form>
    </>
  );
}
