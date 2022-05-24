import Link from 'next/link'
import React from 'react'

interface IProps {
  text: string
}

const FloatingButton: React.FC<IProps> = ({ text }) => {
  return (
    <Link href="/create">
      <div
        className="fixed bottom-4 right-2 cursor-pointer rounded-full border border-black 
        bg-black py-2 px-4 text-sm uppercase text-white text-black dark:bg-white dark:text-black lg:bottom-10
        lg:right-10 lg:px-10 lg:py-4 lg:text-lg"
      >
        {text}
      </div>
    </Link>
  )
}

export default FloatingButton
