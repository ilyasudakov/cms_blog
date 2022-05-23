import Link from 'next/link'
import React from 'react'

interface IProps {
  post: { title: string; excerpt: string; image: { url: string } }
}

const PostWidget: React.FC<IProps> = ({ post }) => {
  const { title, excerpt } = post

  return (
    <div
      key={title}
      className="cursor-pointer rounded-lg border border-gray-700 p-4 transition hover:bg-gray-100"
    >
      <div className="flex">
        <div className="mr-4">
          <div className="text-xl font-bold">{title}</div>
          <div className="line-clamp-3">{excerpt}</div>
        </div>
        <div className="min-w-fit">
          <img width="100%" src={post?.image?.url} />
        </div>
      </div>
      <Link href="/">
        <span className="cursor-pointer py-4 underline">Читать дальше</span>
      </Link>
    </div>
  )
}

export default PostWidget
