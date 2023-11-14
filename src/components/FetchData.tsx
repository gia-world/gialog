"use client";
import { fetchAllPostsData } from "@/redux/actions";
import { useAppDispatch } from "@/redux/store";
import React from "react";

export default function FetchData() {
  const dispatch = useAppDispatch();
  const fetchData = async () => {
    try {
      dispatch(fetchAllPostsData());
      console.log("dispatch fetch all posts called");
    } catch (error) {
      // 에러 처리
    }
  };
  fetchData();
  return <div>FetchData</div>;
}
