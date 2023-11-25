import CreateForm from "@/components/CreateForm";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostEditPage({ params: { slug } }: Props) {
  return (
    <div>
      <h3>수정</h3>
      <CreateForm id={slug} />
    </div>
  );
}
