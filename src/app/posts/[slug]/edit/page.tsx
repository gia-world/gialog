import CreateForm from "@/components/CreateForm";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default function PostEditPage({ params: { slug } }: Props) {
  return (
    <section>
      <CreateForm id={slug} />
    </section>
  );
}
