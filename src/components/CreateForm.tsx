"use client";
import { createPost, Post } from "@/controller/posts";
import today from "@/utils/today";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CreateForm() {
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit: SubmitHandler<Post> = async (data) => {
    const payload = {
      ...data,
      tag: tagsArray,
      createdOn: today(),
      imgUrl: "https://source.unsplash.com/random",
    };
    console.log(payload, "postData");
    // try {
    //   createPost(payload);
    // } catch (error) {
    //   // 네트워크 오류 등의 예외 처리
    //   console.error("Error sending data:", error);
    // }
  };

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
            if (e.key === "Enter") {
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
          <span key={index} className="tag">
            {tag}
          </span>
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
