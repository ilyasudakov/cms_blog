import { GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import PostWidget from '../../components/PostWidget'
import { getCategoryBySlug, getPostsByCategory } from '../../services'

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
      categories: {
        name: string
      }
    }
  }[]
  category: { name: string }
}

const CategoryPage: React.FC<IProps> = ({ posts, category }) => {
  return (
    <div>
      <div className="mb-4 text-2xl font-bold dark:text-gray-100">
        {category.name}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts.map((post) => (
          <PostWidget post={post.node} />
        ))}
      </div>
    </div>
  )
}

export default CategoryPage

interface IParams extends ParsedUrlQuery {
  slug: string
}

export async function getStaticProps(context: any) {
  const { slug } = context.params as IParams
  const posts = await getPostsByCategory(slug)
  const category = await getCategoryBySlug(slug)
  return { props: { posts, category } }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
