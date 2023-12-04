import AllPostsList from "@/components/AllPostsList";
import Categories from "@/components/Categories";
import Link from "next/link";
import React from "react";

export default function PostsPage() {
  return (
    <section>
      <div className="float-right">
        <Link href="/posts/write">
          <button className="button">글쓰기</button>
        </Link>
      </div>
      <h2 className="title">포스트 리스트</h2>
      <AllPostsList />
    </section>
  );
}
