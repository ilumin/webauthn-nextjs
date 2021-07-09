import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import type { NextAuthOptions } from 'next-auth'

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
  callbacks: {},
  events: {},
  theme: 'light',
  debug: false,
}

export default NextAuth(config as NextAuthOptions)
