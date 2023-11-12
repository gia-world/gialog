import AllPostsCarousel from "@/components/AllPostsCarousel";
import FeaturedPosts from "@/components/FeaturedPosts";
import Profile from "@/components/Profile";
import { getPostsList } from "@/controller/posts";

export default async function Home() {
  // const posts = await getPostsList();

  return (
    <>
      <Profile />
      {/* <FeaturedPosts posts={posts} /> */}
      <section>
        <h3>You may like..</h3>
        {/* <AllPostsCarousel posts={posts} /> */}
      </section>
    </>
  );
}
