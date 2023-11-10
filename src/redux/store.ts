import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../redux/postSlice";

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
