import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        console.log("AuthProfile", profile)
    return {
      id: profile.sub,                // required unique identifier
      name: profile.name,             // user full name
      email: profile.email,           // user email
      image: profile.picture          // profile pic
    }
   },
  }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,

   callbacks: {
    async session({ session, token }: { session: Session, token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      console.log("sessionRoute",session, token)
      return session
    },
  },
  
}

export const { handlers:{GET, POST}, auth, signIn, signOut } = NextAuth(authOptions)