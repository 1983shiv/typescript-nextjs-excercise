import React from 'react'
import Postcard from "../../components/Postcard";
import { PostProps } from "../../type/posts"
import { GetStaticProps, GetStaticPaths } from 'next'


const Post = ({post}: PostProps) => {
  return (
    <div>
        <Postcard post={post} />
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json()

    const paths = posts.map((post: PostProps) => ({
        params: { id :  String(post.id) },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    // return { paths, fallback: 'blocking' }
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params} : any) => {    
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
    const post = await res.json()
  
    return {
      props: {
        post,
      },
      revalidate: 10, // In seconds
    }
  }
  
