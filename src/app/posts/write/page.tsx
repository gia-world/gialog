"use client";
import { getPostsList, Post } from "@/controller/posts";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function today() {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const dateString = year + "-" + month + "-" + day;

  return dateString;
}

export default function WritePost() {
  const [tagsArray, setTagsArray] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Post>();
  const onSubmit: SubmitHandler<Post> = (data) => {
    const payload = {
      ...data,
      id: 10, //TODO : 리덕스 적용 후 수정할 것
      tag: tagsArray,
      createdOn: today(),
      imgUrl: "https://source.unsplash.com/random",
    };
    console.log(payload, "postData");
  };

  return (
    <section>
      <h2>포스트 작성</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label className="flex gap-2">
          <span>title</span>
          <input
            defaultValue="test"
            {...register("title")}
            className="flex-1"
          />
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
    </section>
  );
}
