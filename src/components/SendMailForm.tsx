"use client";
import { Mail } from "@/types/mail";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function SendMailForm() {
  const { register, handleSubmit } = useForm<Mail>();

  const onSubmit: SubmitHandler<Mail> = async (data) => {
    try {
      const response = await axios.post("/api/contact", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);

      if (response && response.status === 200) {
        window.alert("메일이 전송되었습니다.");
      }
    } catch (error) {
      console.error("메일 전송에 실패하였습니다:", error);
      window.alert("메일 전송에 실패하였습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <label className="flex gap-2">
        <span>sender address</span>
        <input
          defaultValue="test@test.com"
          {...register("sender")}
          className="flex-1"
        />
      </label>
      <label className="flex gap-2">
        <span>title</span>
        <input defaultValue="test" {...register("title")} className="flex-1" />
      </label>
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
