// postsSlice.ts

import { getPostsList, Post } from "@/controller/posts";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface PostsState {
  data: Post[];
}

// // Asynchronous function to fetch initial data
// const getInitialPosts = async () => {
//   const posts = await getPostsList();
//   const initialState: PostsState = {
//     data: { ...posts },
//   };
//   return initialState;
// };

// //비동기 작업이 완료된 후에 초기 상태를 설정
// export const fetchInitialPosts = createAsyncThunk(
//   "posts/fetchInitialPosts",
//   getInitialPosts
// );

// Create a slice for posts
const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [] } as PostsState,
  reducers: {
    CREATE_POST: (state) => {
      // creating a new post
    },
    READ_ALL: (state) => {
      //  reading posts
    },
    READ_POST: (state) => {
      // reading a post
    },
    UPDATE_POST: (state, action) => {
      // updating a post
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
      }
    },
    DELETE_POST: (state) => {
      //deleting a post
    },
  },
  //   extraReducers: (builder) => {
  //     //fetchInitialPosts.fulfilled 액션이 발생했을 때 상태를 업데이트하도록 설정
  //     builder.addCase(fetchInitialPosts.fulfilled, (state, action) => {
  //       return action.payload;
  //     });
  //   },
});

// Export actions
export const { CREATE_POST, READ_ALL, READ_POST, UPDATE_POST, DELETE_POST } =
  postsSlice.actions;

// Export the reducer
export default postsSlice.reducer;
