import SendMailForm from "@/components/SendMailForm";
import Link from "next/link";
import React from "react";
import { AiFillGithub, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

export default function ContactPage() {
  return (
    <>
      <section>
        <h3 className="text-center">Contact Me</h3>
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Link href="">
              <AiFillGithub size={30} />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiFillInstagram size={30} />
            </Link>
          </li>
          <li>
            <Link href="">
              <AiFillYoutube size={30} />
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h3>이메일 폼</h3>
        <SendMailForm />
      </section>
    </>
  );
}
