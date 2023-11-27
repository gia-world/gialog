import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
      <Image src="/loading.gif" alt="loading..." width={80} height={80} />
    </div>
  );
}
