import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { requireAdmin } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  affiliation: z.string().optional().nullable(),
  interests: z.string().optional().nullable(),
  sections: z.array(z.string()).optional(),
})

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const limit = await rateLimit(`registrations:${ip}`, 10, 10 * 60 * 1000)
    if (!limit.allowed) {
      const retryAfter = Math.max(1, Math.ceil((limit.resetAt - Date.now()) / 1000))
      return NextResponse.json(
        { success: false, error: 'Too many registrations. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      )
    }
    const payload = await request.json()
    if (payload.website) {
      return NextResponse.json({ success: true })
    }
    const data = registrationSchema.parse(payload)

    await prisma.registration.create({
      data: {
        name: data.name,
        email: data.email,
        affiliation: data.affiliation || null,
        interests: data.interests || null,
        sections: Array.isArray(data.sections) ? data.sections : [],
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload', issues: error.issues }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Failed to register' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        affiliation: true,
        interests: true,
        sections: true,
        createdAt: true,
      }
    })
    return NextResponse.json({ success: true, registrations })
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch registrations' }, { status: 500 })
  }
}

