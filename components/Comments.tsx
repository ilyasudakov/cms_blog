import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { createComment } from '../services'
import Button from './Button'
import UserPostDetails from './UserPostDetails'

interface IProps {
  comments: {
    content: string
    createdAt: Date
    id?: string
    author:
      | {
          name?: string | null | undefined
          img?: string | null | undefined
          email?: string | null | undefined
        }
      | undefined
  }[]
  postId: string
}

const Comments: React.FC<IProps> = ({ comments, postId }) => {
  const [comment, setComment] = useState('')
  const [localComments, setLocalComments] = useState(comments)
  const [isLoading, setIsLoading] = useState(false)
  const session = useSession()

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  const submitData = () => {
    if (comment === null) {
      return alert('Вы должны заполнить поле "Комментарий"')
    }
    setIsLoading(true)
    createComment({
      user: session.data?.user,
      content: comment,
      createdAt: new Date(),
      post_id: postId,
    })
      .then(() => {
        setIsLoading(false)
        setComment('')
        setLocalComments([
          ...localComments,
          {
            content: comment,
            createdAt: new Date(),
            author: {
              name: session.data?.user?.name,
              email: session.data?.user?.email,
              img: session.data?.user?.image,
            },
          },
        ])
      })
      .catch((error) => alert(error))
  }

  useEffect(() => {
    setLocalComments([...comments])
  }, [comments])

  return (
    <div>
      <div className="mb-2 text-xl font-bold dark:text-gray-100">
        Комментарии
      </div>
      <form className="mb-4">
        <div className="mb-2 grid">
          <input
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="comment"
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => onInputChange(e)}
            required
            placeholder="Напишите свой комментарий..."
          />
        </div>
        <Button onClick={() => submitData()} text={'Создать комментарий'} />
      </form>
      <div className="grid gap-4">
        {localComments
          .sort((a, b) => {
            if (a.createdAt < b.createdAt) return 1
            if (a.createdAt >= b.createdAt) return -1
            return 0
          })
          .map(({ createdAt, author, content, id }) => (
            <div className="border border-black p-2 dark:border-white" key={id}>
              <div className="mb-2">
                <UserPostDetails
                  createdAt={createdAt}
                  author={{
                    email: author?.email ?? '',
                    name: author?.name ?? '',
                    img: author?.img ?? '',
                  }}
                />
              </div>
              <div className="ml-8">{content}</div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Comments
