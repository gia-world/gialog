import {
  CREATE_POST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
} from "./actions";

const initialState = {
  posts: [],
  isLoaddingPosts: false,
  isLoadedPosts: false,
  loadPostsErrorReason: "",
};

const postsReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST: {
      return {
        ...state,
        isLoaddingPosts: true,
      };
    }
    case LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        isLoaddingPosts: false,
        isLoadedPosts: true,
        posts: action.payload,
      };
    }
    case LOAD_POSTS_FAILURE: {
      return {
        ...state,
        isLoaddingPosts: false,
        loadPostsErrorReason: "불러오기 실패",
      };
    }
    case CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export default postsReducer;
