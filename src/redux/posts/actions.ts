import { NewPost, Post } from "@/types/post";
import { Dispatch } from "redux";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const CREATE_POST = "CREATE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

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

export function updatePost(postId: string, updatedData: NewPost) {
  return {
    type: UPDATE_POST,
    postId,
    payload: updatedData,
  };
}

// 파일 삭제 액션 생성자
export function deletePost(postId: string) {
  return {
    type: DELETE_POST,
    postId,
  };
}

// 비동기 액션 생성자 함수 (thunk 이용)
//!: Redux Thunk : 비동기 작업을 수행하고 액션을 디스패치할 수 있다.
export const fetchAllPostsData = () => async (dispatch: Dispatch) => {
  // 좀 더 안정적으로 각 리듀서가 한번의 스테이트를 변경할 수  있다.
  // 리듀서의 스위치문 하나 내부에서 비동기 작업을 처리할 수도 있지만 그 경우 결과가 여러가지(성공,실패 등)가 나올 수 있다.
  try {
    dispatch(loadPostsRequest()); // 시작

    const response = await fetch("/api/post/list");
    const posts = await response.json();
    dispatch(loadPostsSuccess(posts)); // 끝
  } catch (error) {
    dispatch(loadPostsFailure());
  }
};
