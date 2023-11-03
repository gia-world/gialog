import AllPostsCarousel from "./components/AllPostsCarousel";
import Profile from "./components/Profile";

export default function Home() {
  return (
    <>
      <Profile />
      <div>Featured post</div>
      <AllPostsCarousel />
    </>
  );
}
