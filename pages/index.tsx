import type { NextPage } from 'next'
import CategoriesWidget from '../components/CategoriesWidget'
import Header from '../components/Header'
import PostWidget from '../components/PostWidget'
import { getCategories, getPosts } from '../services'

interface IProps {
  posts: {
    node: {
      title: string
      excerpt: string
      image: { url: string }
      author: { userImage: { url: string }; name: string; email: string }
      createdAt: Date
      id: string
      slug: string
    }
  }[]
  categories: { name: string; slug: string }[]
}

const Home: NextPage<IProps> = ({ posts, categories }) => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 ">
        <section id="posts" className="col-span-10">
          <div className="mb-4 text-2xl font-bold dark:text-gray-100">
            Последние посты
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {posts.map((post) => (
              <PostWidget post={post.node} />
            ))}
          </div>
        </section>
        <div className="col-span-10 sm:col-span-2">
          <CategoriesWidget categories={categories} />
        </div>
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const posts = (await getPosts()) || []
  const categories = (await getCategories()) || []
  return {
    props: { posts, categories },
  }
}
