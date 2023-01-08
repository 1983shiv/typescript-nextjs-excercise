const about = ({posts} : any) => {

  console.log("posts", posts)
  return (
    <div>about</div>
  )
}

export default about


export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts = await res.json()
    return {
      props: {
        posts,
      },
    }
  }

// https://jsonplaceholder.typicode.com/posts