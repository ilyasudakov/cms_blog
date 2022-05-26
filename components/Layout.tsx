import { useSession } from 'next-auth/react'
import React from 'react'
import CategoriesWidget from './CategoriesWidget'
import CreateButton from './CreateButton'
import Header from './Header'
import LatestPostsWidget from './LatestPostsWidget'

const Layout: React.FC = ({ children }) => {
  const session = useSession()
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
        <section className="col-span-10 sm:col-span-12 xl:col-span-10">
          {children}
        </section>
        <div className="sticky top-28 col-span-10 grid gap-2 bg-white dark:bg-black sm:col-span-12 xl:col-span-2">
          <CreateButton
            text={'Написать блог'}
            href={
              session.status === 'unauthenticated' ? '/auth/sign-in' : '/create'
            }
          />
          <CategoriesWidget />
          <LatestPostsWidget />
        </div>
      </div>
    </div>
  )
}

export default Layout
