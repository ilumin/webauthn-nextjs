import type { NextAuthOptions } from 'next-auth'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { saveUser } from '@utils/db'

const config = {
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
  ],

  database: process.env.DATABASE_URL,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  pages: {},
  callbacks: {
    async signIn(user, account, profile) {
      const response = await saveUser(account.id, {
        user,
        account,
        profile,
      })

      console.info(`signed-in as "${response.id}" with rev "${response.rev}"`)

      return true
    },
    // async redirect(url, baseUrl) { return baseUrl },
    async session(session, user) {
      console.log('session-callback', { session, user })
      return session
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (account?.id) token.user = account.id
      console.log('token:', token)
      return token
    },
  },
  events: {},
  theme: 'light',
  debug: false,
}

export default NextAuth(config as NextAuthOptions)
