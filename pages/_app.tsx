import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import moment from 'moment'
import 'moment/locale/ru'
import Header from '../components/Header'
import Head from 'next/head'

moment.locale('ru')

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <link rel="icon" href="/40x40.png" />
      </Head>
      <div className="container mx-auto px-4 sm:px-10">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}

export default MyApp
