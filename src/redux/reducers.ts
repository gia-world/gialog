import { combineReducers } from "redux";
import postsReducer from "./posts/reducer";

export const RootReducer = combineReducers({ posts: postsReducer });
