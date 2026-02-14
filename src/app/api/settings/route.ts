import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string().min(1),
  contactEmail: z.string().email(),
  submissionsOpen: z.boolean(),
  maxSubmissionsPerWeek: z.number().int().min(0),
})

async function getOrCreateSettings() {
  const existing = await prisma.settings.findFirst()
  if (existing) return existing
  return prisma.settings.create({ data: {} })
}

export async function GET() {
  try {
    const settings = await getOrCreateSettings()
    return NextResponse.json({
      success: true,
      settings: {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        contactEmail: settings.contactEmail,
        submissionsOpen: settings.submissionsOpen,
        maxSubmissionsPerWeek: settings.maxSubmissionsPerWeek,
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const payload = await request.json()
    const data = settingsSchema.parse(payload)

    const existing = await prisma.settings.findFirst()
    const updated = existing
      ? await prisma.settings.update({ where: { id: existing.id }, data })
      : await prisma.settings.create({ data })

    return NextResponse.json({
      success: true,
      settings: {
        siteName: updated.siteName,
        siteDescription: updated.siteDescription,
        contactEmail: updated.contactEmail,
        submissionsOpen: updated.submissionsOpen,
        maxSubmissionsPerWeek: updated.maxSubmissionsPerWeek,
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid settings', issues: error.issues }, { status: 400 })
    }
    console.error('Error updating settings:', error)
    return NextResponse.json({ success: false, message: 'Failed to update settings' }, { status: 500 })
  }
}
