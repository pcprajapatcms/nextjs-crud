"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
interface postType {
  _id: string;
  title: string;
  description: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPost] = useState<postType[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/fetchPosts").then(result => result.json());
        console.log(response.fetchPosts);
        //setIsLoading(false);
        setPost(response.fetchPosts);
      }
      catch (error) {
        console.log("Failed to fetch posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {
            posts?.length == 0 ? (
              <div id="alert-border-4" className="flex items-center p-4 mb-4 text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="ms-3 text-sm font-medium">
                  Sorry! No Post Available <Link href="/create" className="font-semibold underline hover:no-underline">Add Post</Link>.
                </div>
              </div>
            ) : (
              posts?.map((post) => (
                <div className="p-4 my-2 rounded-md border-b leading-8" key={post._id}>
                  <div className="font-bold">{post.title}</div>
                  <div>{post.description}
                  </div>
                  <div className="flex gap-4 mt-4 justify-end">
                    <Link
                      href={`edit/${post._id}`}
                      className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest "
                    >
                      Edit
                    </Link>
                    <button className="bg-red-500 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest text-white">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )
          }
        </div>
      )}
    </>
  );
}
