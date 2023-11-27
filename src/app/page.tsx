import AllPostsCarousel from "@/components/AllPostsCarousel";
import FeaturedPosts from "@/components/FeaturedPosts";
import FetchData from "@/components/useFetchData";
import Profile from "@/components/Profile";
import { fetchAllPostsData } from "@/redux/posts/actions";
import { useAppDispatch } from "@/redux/store";
import useFetchData from "@/components/useFetchData";
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
  //
  return (
    <>
      <section>
        <h2 className="hidden">About</h2>
        <Profile />
      </section>
      <section>
        <h2 className="title">Featured Posts</h2>
        <FeaturedPosts />
      </section>
      <section>
        <h2 className="title">You may like..</h2>
        <AllPostsCarousel />
      </section>
    </>
  );
}
