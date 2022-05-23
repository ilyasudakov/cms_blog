import moment from 'moment'
import Link from 'next/link'
import React from 'react'

interface IProps {
  post: {
    title: string
    excerpt: string
    image: { url: string }
    author: { userImage: { url: string }; name: string; email: string }
    createdAt: Date
    slug: string
  }
}

const PostWidget: React.FC<IProps> = ({ post }) => {
  const { title, excerpt, slug, createdAt } = post

  return (
    <div
      key={title}
      className="cursor-pointer border border-gray-900 p-4 dark:border-gray-300"
    >
      <Link href={`/post/${slug}`}>
        <div>
          <div className="text-lg font-bold dark:text-gray-100">{title}</div>
          <div className="flex flex-col items-center sm:flex-row">
            <div className="order-2 mr-4 sm:order-1">
              <div className="line-clamp-3">{excerpt}</div>
            </div>
            {post.image?.url ? (
              <div className="order-1 min-w-full sm:order-2 sm:min-w-min">
                <img src={post.image?.url} />
              </div>
            ) : null}
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Link href={`/user/${post.author.email}`}>
              <div className="flex items-center hover:underline">
                <img
                  width="25"
                  className="mr-2"
                  src={post.author.userImage?.url}
                />
                <span className="mr-2">{post.author.name}</span>
              </div>
            </Link>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostWidget
