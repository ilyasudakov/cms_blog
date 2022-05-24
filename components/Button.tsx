import React from 'react'

interface IProps {
  text: string
  onClick?: () => any
}

const Button: React.FC<IProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex w-fit items-center rounded-full border border-gray-900 py-1 px-4 text-sm dark:border-gray-100"
    >
      <div className="dark:text-white">{text}</div>
    </button>
  )
}

export default Button
