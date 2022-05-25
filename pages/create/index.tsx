import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import { addBlog } from '../../services'

const CreateBlogPage: React.FC = () => {
  const session = useSession()
  const [formInputs, setFormInputs] = useState({
    title: '',
    excerpt: '',
    image: '',
    createdAt: new Date(),
    slug: '',
    content: '',
    author: session.data?.user,
  })

  const submitData = () => {
    console.log(formInputs, session.data?.user)
    addBlog(formInputs, session.data?.user)
  }

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name
    const value = e.target.value
    setFormInputs({
      ...formInputs,
      [name]: value,
    })
  }

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      Router.push('/auth/sign-in')
    }
  }, [session.status])

  return (
    <div className="">
      <div className="mb-4 text-2xl font-bold dark:text-gray-100">
        Создайте свою статью
      </div>
      <form className="grid lg:max-w-screen-xl">
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="title">
            Заголовок
          </label>
          <input
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="title"
            type="text"
            name="title"
            value={formInputs.title}
            onChange={(e) => onInputChange(e)}
            required
            placeholder="Введите заголовок..."
          />
        </div>
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="excerpt">
            Краткое описание
          </label>
          <input
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="excerpt"
            name="excerpt"
            value={formInputs.excerpt}
            onChange={(e) => onInputChange(e)}
            required
            type="text"
            placeholder="Введите краткое описание..."
          />
        </div>
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="content">
            Основной текст
          </label>
          <textarea
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="content"
            value={formInputs.content}
            onChange={(e) => onInputChange(e)}
            required
            name="content"
            placeholder="Введите текст..."
          />
        </div>
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="slug">
            Название страницы для браузера (URL), например:
            'site-example-nextjs'
          </label>
          <input
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="slug"
            name="slug"
            type="text"
            value={formInputs.slug}
            onChange={(e) => onInputChange(e)}
            required
            placeholder="Введите название для url..."
          />
        </div>
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="image">
            Ссылка на картинку - URL
          </label>
          <input
            className="border border-black p-2 dark:border-white dark:bg-black dark:text-white"
            id="image"
            name="image"
            value={formInputs.image}
            onChange={(e) => onInputChange(e)}
            type="text"
            placeholder="Введите url ссылку на картинку..."
          />
        </div>
        <Button onClick={() => submitData()} text={'Создать статью'} />
      </form>
    </div>
  )
}

export default CreateBlogPage
