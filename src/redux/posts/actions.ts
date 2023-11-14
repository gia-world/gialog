import { Post } from "@/types/post";
import { Dispatch } from "redux";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const CREATE_POST = "CREATE_POST";

// 액션 생성자 함수 정의
export const loadPostsRequest = () => ({
  type: LOAD_POSTS_REQUEST,
});

export const loadPostsSuccess = (posts: Post[]) => ({
  type: LOAD_POSTS_SUCCESS,
  payload: posts,
});

export const loadPostsFailure = () => ({
  type: LOAD_POSTS_FAILURE,
});
export const createPost = (post: Post) => ({
  type: CREATE_POST,
  payload: post,
});

// 비동기 액션 생성자 함수 (thunk 이용)
//!: Redux Thunk : 비동기 작업을 수행하고 액션을 디스패치할 수 있다.
export const fetchAllPostsData = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadPostsRequest()); // 시작

    const response = await fetch("/api/post/list");
    const posts = await response.json();

    dispatch(loadPostsSuccess(posts)); // 끝
  } catch (error) {
    dispatch(loadPostsFailure());
  }
};
