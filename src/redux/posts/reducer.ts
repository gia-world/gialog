import { NewPost, Post } from "@/types/post";
import {
  CREATE_POST,
  DELETE_POST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  UPDATE_POST,
} from "./actions";

const initialState = {
  data: [],
  loadPostsStatus: "idle",
  loadPostsError: "",
};

const postsReducer = (
  state = initialState,
  action: { type: string; payload: Post | NewPost | Post[]; postId: string }
) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST: {
      // 하나의 스위치문은 하나의 결과만을 가지고 온다.
      return {
        ...state,
        // isLoaddingPosts: true,
        loadPostsStatus: "loading",
      };
    }
    case LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        loadPostsStatus: "success",
        // isLoaddingPosts: false,
        // isLoadedPosts: true,
        data: action.payload,
      };
    }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        // isLoaddingPosts: false,
        loadPostsStatus: "failure",
        loadPostsError: "불러오기 실패",
      };
    }
    case CREATE_POST:
      return { ...state, posts: [...state.data, action.payload] };
    case UPDATE_POST:
      const updatedPost = state.data.map((post: Post) => {
        if (post.id === action.postId) {
          return { ...post, ...action.payload };
        }
        return post;
      });
      return {
        ...state,
        data: updatedPost,
      };
    case DELETE_POST:
      const filteredPosts = state.data.filter(
        (post: Post) => post.id !== action.postId
      );
      return {
        ...state,
        data: filteredPosts,
      };
    default:
      return state;
  }
};

export default postsReducer;
