import React, { useState } from "react";
import Postcard from "../../components/Postcard";
import { PostProps } from "../../type/posts"
import { GetStaticProps } from 'next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'


const Posts = ({ posts } : any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`/posts/?page=${(currentPage - 1)}`, undefined, { shallow: true })
    }
    // router.push(`/posts/?page=${currentPage + 1}`, undefined, { shallow: true })
  };

  const handleNextClick = () => {
    if (currentPage < posts.length / pageSize) {
      setCurrentPage(currentPage + 1);
      router.push(`/posts/?page=${(currentPage + 1)}`, undefined, { shallow: true })
    }
    
  };

  // console.log("currentPage", currentPage);
  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push(`/posts/?page=1`, undefined, { shallow: true })
  }, [])

  useEffect(() => {
    // currentPage = router.query.page? String(router.query.page) : 1;
    
    console.log("currentPage", router.query.page);
    router.push(`/posts/?page=${currentPage}`, undefined, { shallow: true })
  }, [router.query.page])

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {posts
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((post: PostProps) => {
              return <Postcard key={post.id} post={post} />;
            })}
        </div>
      </div>
      <div className="flex p-2 w-full justify-center ">
        <button
          onClick={handlePreviousClick}
          className={`${currentPage === 1 ? 'disabled bg-white text-indigo-500 border-2 border-indigo-500' : 'bg-indigo-500 text-white border-0'} flex mx-4 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className={`${currentPage > 9 ? 'disabled bg-white text-indigo-500 border-2 border-indigo-500' : 'bg-indigo-500 text-white border-0'} flex  py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async() => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}


