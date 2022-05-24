import { NextPage } from 'next'
import { getSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../../../components'

const SignOut: NextPage = () => {
  return (
    <div className="container mx-auto h-screen p-2 text-center">
      <div className="mt-60 grid grid-cols-1 place-items-center">
        <Button text="Выйти из акккаунта" onClick={() => signOut()} />
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
