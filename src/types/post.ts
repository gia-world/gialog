export type Post = {
  id: string;
  title: string;
  createdOn: string;
  desc: string;
  tag: string[];
  imgUrl: string;
  content: string;
};

// CreatePost 타입은 Post를 상속하여 id를 optional로 만듦
export type CreatePost = Omit<Post, "id"> & { id?: string };

// 공통화된 응답 타입 정의
export type ApiResponse<T> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string };
