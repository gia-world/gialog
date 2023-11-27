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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <label className="form-label">
        <span className="form-name">Sender</span>
        <input
          defaultValue="test@test.com"
          {...register("sender", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // 이메일 정규식
              message: "유효한 이메일 주소를 입력하세요",
            },
          })}
          className="form-input"
        />
      </label>
      <label className="form-label">
        <span className="form-name">Title</span>
        <input
          defaultValue="test"
          {...register("title")}
          className="form-input"
        />
      </label>
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
  );
}
