"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import { fsGetTags } from "@/service/posts";

export default function Categories({ categories }: { categories: string[] }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <p className="font-semibold">CATEGORIES :</p>
      <ul className="flex mb-2">
        {categories.map((category) => (
          <li
            key={category}
            className="cursor-pointer hover:bg-rose-100 px-1"
            onClick={() => router.push(`/posts?category=${category}`)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
