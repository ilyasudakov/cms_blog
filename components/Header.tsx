import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

interface IProps {
  pageTitle: string
}

const Header: React.FC<IProps> = ({ pageTitle }) => {
  const { data: session } = useSession()
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container flex items-center justify-between border-b py-2">
        <div className="cursor-pointer">
          <Link href="/">
            <svg fill="none" viewBox="0 0 75 75" height="40px" width="40px">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M50.92 10l-8.73 5-8.73 5-8.73 5v30l8.73-5 8.73-5V35l-8.73 5V30l8.73-5 8.73-5v30l-8.73 5-8.73 5-8.73 5L16 70l8.73 5 8.73-5 8.73-5 8.73-5 8.73-5V5l-8.73-5v10z"
                clip-rule="evenodd"
              ></path>
            </svg>
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
                <span className="cursor-pointer text-lg">Sign Out</span>
              </Link>
            </>
          ) : (
            <Link href="/auth/sign-in">
              <span className="cursor-pointer text-lg">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
