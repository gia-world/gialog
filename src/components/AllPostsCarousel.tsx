"use client";

import Slider from "react-slick";
import PostItemLayout from "./PostItemLayout";

import { RootState } from "@/redux/store";
import { Post } from "@/types/post";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useFetchData from "./useFetchData";

// 캐러셀은 상태가 계속 바뀌어야 하므로 **클라이언트 컴포넌트**로 만들어야 함

export default function AllPostsCarousel() {
  useFetchData();
  // const data: Post[] = useSelector((state: RootState) => state.posts.data);

  // const state = useSelector((state: RootState) => state.posts);
  // const data = state.data;
  // const loadingFinished = state.loadPostsStatus === "success";

  const postsState = useSelector((state: RootState) => state.posts);
  const { data, loadPostsStatus } = postsState;

  const loadingFinished = loadPostsStatus === "success";

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

  if (loadingFinished) {
    return (
      <Slider {...settings}>
        {data.map((post) => (
          <li key={`post-${post.id}`}>
            <PostItemLayout post={post} />
          </li>
        ))}
      </Slider>
    );
  } else {
    return null;
  }
}
