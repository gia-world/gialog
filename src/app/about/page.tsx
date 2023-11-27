import React from "react";
import Profile from "../../components/Profile";

export default function AboutPage() {
  return (
    <>
      <section>
        <h2 className="hidden">About</h2>
        <Profile />
      </section>
      <section>
        <h2 className="title">Who am I?</h2>
      </section>
    </>
  );
}
