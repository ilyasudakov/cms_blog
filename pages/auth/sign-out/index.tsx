import { NextPage } from 'next'
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'

const SignOut: NextPage = () => {
  return (
    <div className="container mx-auto h-screen p-2 text-center">
      <div className="mt-60 grid grid-cols-1 place-items-center">
        <button
          className="flex w-fit items-center rounded-full border border-gray-700 py-1 px-4 text-sm"
          onClick={() => signOut()}
        >
          <span>Выйти из акккаунта</span>
        </button>
        <Link href="/">
          <span className="cursor-pointer py-4 underline">На главную</span>
        </Link>
      </div>
    </div>
  )
}

export default SignOut

export const getServerSideProps = async (context: any) => {
  const { req } = context
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: { destination: '/' },
    }
  }
  return { props: {} }
}
