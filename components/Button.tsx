import React from 'react'

interface IProps {
  text: string
  onClick?: () => {}
}

const Button: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex w-fit items-center rounded-full border border-gray-900 py-1 px-4 text-sm dark:border-gray-100"
    >
      <div>{text}</div>
    </button>
  )
}

export default Button
