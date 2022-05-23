import type { NextPage } from 'next'
import Header from '../components/Header'
import PostWidget from '../components/PostWidget'
import { getPosts } from '../services'

interface IProps {
  posts: {
    node: {}
  }[]
}

const Home: NextPage<IProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10">
      <Header pageTitle="Главная" />
      <div className="mb-2 text-2xl font-bold">Последние посты</div>
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostWidget post={post.node} />
        ))}
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const posts = (await getPosts()) || []
  return {
    props: { posts },
  }
}
