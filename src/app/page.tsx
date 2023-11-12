import AllPostsCarousel from "@/components/AllPostsCarousel";
import FeaturedPosts from "@/components/FeaturedPosts";
import Profile from "@/components/Profile";
import { getPostsList } from "@/controller/posts";
import { Post } from "@/types/post";

export default async function Home() {
  // const posts = await getPostsList();
  // console.log(posts);
  // async function fetchPostsList() {
  //   try {
  //     const response = await fetch("/api/post/list", {
  //       method: "GET",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch posts list");
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // const postsListData = await fetchPostsList();
  // console.log(postsListData);

  return (
    <>
      <Profile />
      {/* <FeaturedPosts posts={posts} /> */}
      <section>
        <h3>You may like..</h3>
        <AllPostsCarousel />
      </section>
    </>
  );
}
