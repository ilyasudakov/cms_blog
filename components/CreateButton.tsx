import Link from 'next/link'
import React from 'react'

interface IProps {
  text: string
  href: string
}

const CreateButton: React.FC<IProps> = ({ text, href }) => {
  return (
    <Link href={href}>
      <div
        className="lg:text-md cursor-pointer border 
        border-black bg-black py-2 px-4 text-center text-sm text-white text-black
        dark:bg-white dark:text-black"
      >
        {text}
      </div>
    </Link>
  )
}

export default CreateButton
