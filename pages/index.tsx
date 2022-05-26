import type { NextPage } from 'next'
import { PostWidget } from '../components'
import { getPosts } from '../services'

interface IProps {
  posts: {
    node: {
      title: string
      excerpt: string
      image: string
      author: { img: string; name: string; email: string }
      createdAt: Date
      id: string
    }
  }[]
}

const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <section id="posts">
      <div className="mb-4 text-2xl font-bold dark:text-gray-100">
        Интересные посты
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {posts.map((post) => (
          <PostWidget key={post.node.id} post={post.node} />
        ))}
      </div>
    </section>
  )
}

export default Home

export async function getServerSideProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
