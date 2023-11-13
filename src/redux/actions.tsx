import { Post } from "@/types/post";
import { Dispatch } from "redux";

// 액션 생성자 함수 정의
export const CREATE_POST = (post: Post) => ({
  type: "CREATE_POST",
  payload: post,
});
export const GET_ALL_POSTS_REQUEST = () => ({
  type: "GET_ALL_POSTS_REQUEST",
});
export const GET_ALL_POSTS_SUCCESS = (posts: Post[]) => ({
  type: "GET_ALL_POSTS_SUCCESS",
  payload: posts,
});
export const GET_ALL_POSTS_FAILURE = (error: string) => ({
  type: "GET_ALL_POSTS_FAILURE",
  payload: error,
});

// 비동기 액션 생성자 함수
export const fetchAllPostsData = () => async (dispatch: Dispatch) => {
  try {
    dispatch(GET_ALL_POSTS_REQUEST());

    const response = await fetch("/api/post/list");
    const posts = await response.json();

    dispatch(GET_ALL_POSTS_SUCCESS(posts));
  } catch (error) {
    dispatch(GET_ALL_POSTS_FAILURE("An error occurred."));
  }
};
