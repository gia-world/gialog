"use client";
import { fetchAllPostsData } from "@/redux/posts/actions";
import { useAppDispatch } from "@/redux/store";
import React, { useEffect } from "react";

// 커스텀 훅 생성
export default function useFetchData() {
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    try {
      dispatch(fetchAllPostsData());
      console.log("dispatch fetch all posts called");
    } catch (error) {
      console.error("dispatch failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
}
