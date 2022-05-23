import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import useTheme from './hooks/useTheme'

const Header: React.FC = () => {
  const { data: session } = useSession()
  const mode = useTheme()
  return (
    <div className="mb-6">
      <div className="container flex items-center justify-between border-b border-gray-100 py-4">
        <div className="cursor-pointer">
          <Link href="/">
            <div className="flex items-center">
              <img
                src={
                  mode === 'light' ? '/120x100.png' : '/120x100_inverted.png'
                }
                height="40px"
                width="40px"
                alt=""
              />
              <span className="ml-2 hidden text-2xl sm:block">.webhub</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {session ? (
            <>
              <div className="mr-4 w-fit">
                {session.user?.image ? (
                  <img
                    className="rounded-full"
                    width="40"
                    src={session.user?.image}
                    alt=""
                  />
                ) : null}
              </div>
              <Link href="/auth/sign-out">
                <span className="cursor-pointer text-lg underline">Выйти</span>
              </Link>
            </>
          ) : (
            <Link href="/auth/sign-in">
              <span className="cursor-pointer text-lg underline">Войти</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
