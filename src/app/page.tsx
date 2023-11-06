import PostItemLayout from "@/components/PostItemLayout";
import AllPostsCarousel from "@/components/AllPostsCarousel";
import Profile from "@/components/Profile";
import { getPostsList } from "@/controller/posts";

export default async function Home() {
  const posts = await getPostsList();
  const myPicks = [1, 2, 3];
  const featuredPosts = posts.filter((item) =>
    myPicks.includes(Number(item.id))
  );
  return (
    <>
      <Profile />
      <section>
        <h3>Featured posts</h3>
        <ul>
          {featuredPosts.map((post) => (
            <li key={`featuredPost-${post.id}`}>
              <PostItemLayout post={post} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>You may like..</h3>
        <AllPostsCarousel posts={posts} />
      </section>
    </>
  );
}
