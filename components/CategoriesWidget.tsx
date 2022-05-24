import Link from 'next/link'
import React from 'react'
import Button from './Button'

interface IProps {
  categories: {
    name: string
    slug: string
  }[]
}

const CategoriesWidget: React.FC<IProps> = ({ categories }) => {
  return (
    <div className="t-0 mb-4 block grid gap-2 rounded-md border border-gray-900 p-4 dark:border-gray-300 lg:sticky">
      <div className="text-lg font-bold dark:text-gray-100">Категории</div>
      {categories.map(({ name, slug }) => (
        <Link href={`/category/${slug}`}>
          <span className="cursor-pointer underline">{name}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoriesWidget
