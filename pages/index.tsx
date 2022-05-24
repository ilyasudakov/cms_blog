import type { NextPage } from 'next'
import CategoriesWidget from '../components/CategoriesWidget'
import CreateButton from '../components/CreateButton'
import LatestPostsWidget from '../components/LatestPostsWidget'
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
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
      <section id="posts" className="col-span-10 sm:col-span-12 xl:col-span-10">
        <div className="mb-4 text-2xl font-bold dark:text-gray-100">
          Интересные посты
        </div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {posts.map((post) => (
            <PostWidget post={post.node} />
          ))}
        </div>
      </section>
      <div className="sticky top-28 col-span-10 bg-white dark:bg-black sm:col-span-12 xl:col-span-2">
        <CreateButton text={'Написать блог'} href={'/create'} />
        <CategoriesWidget categories={categories} />
        <LatestPostsWidget posts={posts} />
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
