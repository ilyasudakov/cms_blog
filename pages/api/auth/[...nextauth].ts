import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { addUser, isNewUser } from '../../../services'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (await isNewUser(user.email || '')) {
        addUser(user)
      }
      return true
    },
  },
})
