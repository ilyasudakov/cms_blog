import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import { addBlog, getCategories } from '../../services'
import Select, { MultiValue } from 'react-select'

interface IProps {
  categories: { name: string; slug: string }[]
}

interface IFormInputs {
  title: string
  excerpt: string
  image: string
  createdAt: Date
  content: string
  author:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
  categories: MultiValue<{ label: string; value: string } | null> | null
}

const CreateBlogPage: React.FC<IProps> = ({ categories }) => {
  const session = useSession()
  const categoriesSelect = categories.map((category) => ({
    label: category.name,
    value: category.slug,
  }))
  const [formInputs, setFormInputs] = useState<IFormInputs>({
    title: '',
    excerpt: '',
    image: '',
    createdAt: new Date(),
    content: '',
    author: session.data?.user,
    categories: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const submitData = () => {
    if (formInputs.title === '') {
      return alert('Вы должны заполнить поле "Заголовок"')
    }
    if (formInputs.excerpt === '') {
      return alert('Вы должны заполнить поле "Краткое описание"')
    }
    if (formInputs.content === '') {
      return alert('Вы должны заполнить поле "Основной Текст"')
    }
    if (formInputs.categories === null) {
      return alert('Вы должны заполнить поле "Категория статьи"')
    }
    setIsLoading(true)
    addBlog(formInputs, session.data?.user)
      .then((res) => {
        Router.push(`/post/${res.createPost.id}`)
      })
      .catch((error) => alert(error))
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

  if (isLoading) {
    return (
      <div className="mb-4 text-lg dark:text-gray-100">
        Ваша статья успешно создана, сейчас вы будете перенаправлены на страницу
        с ней
      </div>
    )
  }
  return (
    <div className="">
      <div className="mb-4 text-2xl font-bold dark:text-gray-100">
        Создайте свою статью
      </div>
      <form className="grid lg:max-w-screen-xl">
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white" htmlFor="title">
            Заголовок*
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
            Краткое описание*
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
            Основной текст*
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
        <div className="mb-4 grid">
          <label className="text-xl dark:text-white">Категория статьи*</label>
          <Select
            options={categoriesSelect}
            defaultValue={formInputs.categories}
            onChange={(newValue) => {
              setFormInputs({
                ...formInputs,
                categories: newValue,
              })
            }}
            isMulti
            isClearable
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Выберите категории"
          />
        </div>
        <Button onClick={() => submitData()} text={'Создать статью'} />
      </form>
    </div>
  )
}

export default CreateBlogPage

export async function getServerSideProps() {
  const categories = (await getCategories()) || []
  return {
    props: { categories },
  }
}
