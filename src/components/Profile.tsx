import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="bg-slate-400 rounded-full h-32 w-32"></div>
      <div className="text-center">
        <p>Frontend Developer</p>
        <p className="italic">Never stop exploring, never stop growing.</p>
      </div>
    </div>
  );
}
