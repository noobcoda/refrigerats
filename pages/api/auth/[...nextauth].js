import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.uid = token.sub;
      return session;
    }
  },
  events: {
    async signIn(message){ /* on successful sign in' */}
  }
});