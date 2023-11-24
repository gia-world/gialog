import { Post } from "@/types/post";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { RootReducer } from "./reducers";

const store = configureStore({
  reducer: RootReducer,
});
console.log(store.getState(), "스토어 상태");

// https://redux-toolkit.js.org/tutorials/typescript
export type AppDispatch = typeof store.dispatch; // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;

// export type RootState = ReturnType<typeof store.getState>;

type PostsState = {
  data: Post[];
  loadPostsStatus: string;
  loadPostsError: string;
};
export type RootState = {
  posts: PostsState;
};
