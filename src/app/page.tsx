import AllPostsCarousel from "@/components/AllPostsCarousel";
import FeaturedPosts from "@/components/FeaturedPosts";
import FetchData from "@/components/FetchData";
import Profile from "@/components/Profile";
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
      <FetchData />
      {/* //? 전체 데이터를 dispatch 하는 더 좋은 방법이 있을 것 같은데... */}
      <Profile />
      {/* <FeaturedPosts posts={posts} /> */}
      <section>
        <h3>You may like..</h3>
        <AllPostsCarousel />
      </section>
    </>
  );
}
