"use client";

import { Post } from "@/service/posts";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import PostItemLayout from "./PostItemLayout";

// 캐러셀은 상태가 계속 바뀌어야 하므로 **클라이언트 컴포넌트**로 만들어야 함

type Props = {
  posts: Post[];
};

export default function AllPostsCarousel({ posts }: Props) {
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
      {posts.map((post) => (
        <li key={`post-${post.id}`}>
          <Link href="">
            <PostItemLayout post={post} />
          </Link>
        </li>
      ))}
    </Slider>
  );
}
