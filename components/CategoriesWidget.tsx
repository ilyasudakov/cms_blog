import Link from 'next/link'
import React from 'react'

interface IProps {
  categories: {
    name: string
    slug: string
  }[]
}

const CategoriesWidget: React.FC<IProps> = ({ categories }) => {
  return (
    <div className="t-0 block grid gap-2 border border-gray-900 p-4 dark:border-gray-300 lg:sticky">
      <div className="text-lg font-bold dark:text-gray-100">Категории</div>
      {categories.map(({ name, slug }) => (
        <Link key={slug} href={`/category/${slug}`}>
          <span className="cursor-pointer hover:underline">{name}</span>
        </Link>
      ))}
    </div>
  )
}

export default CategoriesWidget
