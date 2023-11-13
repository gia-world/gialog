import {
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  CREATE_POST,
} from "./actions";
import { Post } from "@/types/post";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsReducer = (
  state: PostsState = initialState,
  action: any
): PostsState => {
  switch (action.type) {
    case GET_ALL_POSTS_REQUEST:
      return { ...state, status: "loading" };
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        posts: action.payload,
        error: null,
      };
    case GET_ALL_POSTS_FAILURE:
      return { ...state, status: "failed", error: action.payload };
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export default postsReducer;
