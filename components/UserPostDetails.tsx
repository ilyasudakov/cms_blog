import moment from 'moment'
import Link from 'next/link'
import React from 'react'

interface IProps {
  createdAt: Date
  author: {
    email: string
    name: string
    userImage: {
      url?: string
    }
  }
}

const UserPostDetails: React.FC<IProps> = ({ createdAt, author }) => {
  return (
    <div className="flex items-center text-sm">
      <Link href={`/user/post/${author.email}`}>
        <div className="flex cursor-pointer items-center hover:underline">
          <img width="25" className="mr-2" src={author.userImage?.url} />
          <span className="mr-2">{author.name}</span>
        </div>
      </Link>
      <span>{moment(createdAt).fromNow()}</span>
    </div>
  )
}

export default UserPostDetails
