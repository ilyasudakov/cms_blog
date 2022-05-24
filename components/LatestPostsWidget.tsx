import Link from 'next/link'
import React from 'react'

interface IProps {
  posts: {
    node: {
      title: string
      excerpt: string
      image: string
      author: { img: string; name: string; email: string }
      createdAt: Date
      id: string
      slug: string
    }
  }[]
}

const LatestPostsWidget: React.FC<IProps> = ({ posts }) => {
  return (
    <div className="t-0 mb-2 block grid gap-2 border border-gray-900 p-4 dark:border-gray-300 lg:sticky">
      <div className="text-lg font-bold dark:text-gray-100">
        Новые публикации
      </div>
      {posts.slice(0, 2).map((post) => (
        <Link key={post.node.id} href={`/post/${post.node.slug}`}>
          <span className="mb-2 cursor-pointer text-sm hover:underline">
            {post.node.title}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default LatestPostsWidget
