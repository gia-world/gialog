import AllPostsList from "@/components/AllPostsList";
import Link from "next/link";
import React from "react";

export default function PostsPage() {
  return (
    <>
      <section className="text-end">
        <Link href="/posts/write">
          <button>글쓰기</button>
        </Link>
      </section>
      <section>
        <h3>포스트 리스트</h3>
        <AllPostsList />
      </section>
    </>
  );
}
