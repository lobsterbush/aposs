import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import { prisma } from "@/lib/db"

// Minimal NextAuth config using a single admin account from env
// Set ADMIN_EMAIL and ADMIN_PASSWORD in your environment.
const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        if (!credentials?.email || !credentials?.password) return null
        if (!adminEmail || !adminPassword) return null

        if (
          credentials.email.toLowerCase() === adminEmail.toLowerCase() &&
          credentials.password === adminPassword
        ) {
          // Ensure an admin user exists in DB for potential relations
          const user = await prisma.user.upsert({
            where: { email: adminEmail },
            update: { role: "ADMIN" },
            create: { email: adminEmail, role: "ADMIN", name: "APOSS Admin" },
          })
          return { id: user.id, email: user.email, name: user.name, role: user.role }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: import('next-auth').User | import('next-auth/adapters').AdapterUser | null }) {
      const t = token as JWT & { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }
      if (user) {
        const u = user as unknown as { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }
        t.role = u.role ?? t.role ?? 'VIEWER'
      }
      return t
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const t = token as JWT & { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }
      if (session.user) {
        (session.user as unknown as { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }).role = t.role ?? 'VIEWER'
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
