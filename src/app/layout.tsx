import ReduxProvider from "@/redux/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { BsStars } from "react-icons/bs";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gialog",
  description: "마크다운을 이용한 블로그",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 flex justify-between px-10 py-4">
          <Link href="/">
            <h1 className="flex items-center text-lg">
              <BsStars />
              GiaLog
            </h1>
          </Link>
          <nav className="flex gap-4">
            <Link href="/about">ABOUT</Link>
            <Link href="/posts">POSTS</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
        </header>
        <main className="min-h-screen flex flex-col gap-12 p-10">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
        <footer className="bg-slate-100 py-2">
          <p className=" text-center font-light text-sm">&copy; 2023 Gialog</p>
        </footer>
      </body>
    </html>
  );
}
