import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { JWT } from "next-auth/jwt"
import type { Session } from "next-auth"
import { prisma } from "@/lib/db"

// Get admin emails from environment
function getAdminEmails(): string[] {
  const adminEmail = process.env.ADMIN_EMAIL || ''
  return adminEmail.split(',').map(email => email.trim().toLowerCase()).filter(Boolean)
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
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
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow admin emails to sign in
      const adminEmails = getAdminEmails()
      const userEmail = user.email?.toLowerCase()
      
      if (!userEmail || !adminEmails.includes(userEmail)) {
        console.log(`Sign-in attempt blocked for non-admin email: ${userEmail}`)
        return false
      }
      
      // Ensure user exists in DB with ADMIN role
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
      
      // Set role from database or default to ADMIN for whitelisted users
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
})

export { handler as GET, handler as POST }
