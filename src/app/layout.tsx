import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <header className="max-w-3xl m-auto p-6 border-b flex justify-between bg-blue-500 rounded-br-lg rounded-bl-lg items-center">
          <Link href={"/"} className="text-2xl text-white" >Tech Posts</Link>
          <Link href={"/create"} className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md" >Add New</Link>
        </header>
        <div className="max-w-3xl m-auto text-slate-800">
          <main className="p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
