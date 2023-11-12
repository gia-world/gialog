"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PostItemLayout from "./PostItemLayout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Post } from "@/types/post";

// 캐러셀은 상태가 계속 바뀌어야 하므로 **클라이언트 컴포넌트**로 만들어야 함

type Props = {
  posts: Post[];
};

export default function AllPostsCarousel() {
  async function fetchPostsList() {
    try {
      const response = await fetch("/api/post/list", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts list");
      }

      const res = await response.json();
      return res;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const [data, setData] = useState<Post[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsListData = await fetchPostsList();
        setData(postsListData);
      } catch (error) {
        console.error("Error fetching posts list:", error);
      }
    };

    fetchData();
  }, []);
  // const postsListData = await fetchPostsList();
  // console.log(postsListData);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((post) => (
          <li key={`post-${post.id}`}>
            <PostItemLayout post={post} />
          </li>
        ))}
    </Slider>
  );
}
