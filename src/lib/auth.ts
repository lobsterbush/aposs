import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import { prisma } from "@/lib/db"

function getAdminEmails(): string[] {
  const adminEmail = process.env.ADMIN_EMAIL || ''
  return adminEmail.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

const providers: NextAuthOptions["providers"] = []

if (process.env.RESEND_API_KEY) {
  providers.push(
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST || 'smtp.resend.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY || ''
        }
      },
      from: process.env.EMAIL_FROM || 'APOSS <auth@aposs.org>',
    })
  )
} else {
  providers.push(
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const adminEmails = getAdminEmails()
        const email = credentials?.email?.toLowerCase() || ''
        const password = credentials?.password || ''
        const expectedPassword = process.env.ADMIN_PASSWORD || ''

        if (!email || !adminEmails.includes(email)) return null
        if (!expectedPassword || password !== expectedPassword) return null

        return { id: email, email, name: email.split('@')[0] }
      }
    })
  )
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    async signIn({ user }) {
      const adminEmails = getAdminEmails()
      const userEmail = user.email?.toLowerCase()
      
      if (!userEmail || !adminEmails.includes(userEmail)) {
        console.log(`Sign-in attempt blocked for non-admin email: ${userEmail}`)
        return false
      }
      
      await prisma.user.upsert({
        where: { email: userEmail },
        update: { role: "ADMIN" },
        create: { 
          email: userEmail, 
          role: "ADMIN", 
          name: user.name || userEmail.split('@')[0]
        },
      })
      
      return true
    },
    async jwt({ token, user }: { token: JWT; user?: import('next-auth').User | import('next-auth/adapters').AdapterUser | null }) {
      const t = token as JWT & { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }
      
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })
        t.role = dbUser?.role || 'ADMIN'
      }
      
      return t
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const t = token as JWT & { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }
      if (session.user) {
        (session.user as unknown as { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' }).role = t.role ?? 'ADMIN'
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verify=true',
    error: '/login',
  },
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  const role = (session?.user as { role?: 'ADMIN' | 'ORGANIZER' | 'VIEWER' } | undefined)?.role
  if (!session?.user || (role !== 'ADMIN' && role !== 'ORGANIZER')) {
    return null
  }
  return session
}
