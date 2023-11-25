import Link from "next/link";
import React from "react";

export default function PostsPage() {
  return (
    <>
      <section>
        <Link href="/posts/write">
          <button>글쓰기</button>
        </Link>
      </section>
      <section>포스트 리스트</section>
    </>
  );
}
