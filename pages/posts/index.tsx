import React, { useState } from "react";
import { Postcard } from "../components/Postcard";

export type Post = {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
};

type Posts = Post[];

const Posts = ({ posts }: any) => {
  //   console.log("posts", posts);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < posts.length / pageSize) {
      setCurrentPage(currentPage + 1);
    }
  };

  //   console.log("currentPage", currentPage);
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((post: Post) => {
              return <Postcard key={post.id} post={post} />;
            })}
          {/* {posts.map((post: Post) => {
            return <Postcard key={post.id} post={post} />;
          })} */}
        </div>
      </div>
      <div className="flex p-2 w-full justify-center ">
        <button
          onClick={handlePreviousClick}
          className="${currentPage === 1 ? 'disabled bg-indigo-100' : ''} flex mx-4 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className="flex text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Posts;

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

// https://jsonplaceholder.typicode.com/posts
