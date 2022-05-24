import { GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import PostWidget from '../../../components/PostWidget'
import { getPostsByUser } from '../../../services'

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
}

const UsersPosts: React.FC<IProps> = ({ posts }) => {
  const author = posts[0].node.author
  return (
    <div>
      <div className="mb-4 flex items-center text-2xl font-bold dark:text-white">
        <img width="35" className="mr-2" src={author.userImage?.url} />
        <span className="dark:text-white">{`${author.name} - публикации`}</span>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts
          .sort((a, b) => {
            if (a.node.createdAt < b.node.createdAt) return 1
            if (a.node.createdAt >= b.node.createdAt) return -1
            return 0
          })
          .map((post) => (
            <PostWidget post={post.node} />
          ))}
      </div>
    </div>
  )
}

export default UsersPosts

interface IParams extends ParsedUrlQuery {
  slug: string
}

export async function getStaticProps(context: any) {
  const { slug } = context.params as IParams
  const posts = await getPostsByUser(slug)
  return { props: { posts } }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
