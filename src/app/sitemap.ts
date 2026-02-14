import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const now = new Date().toISOString()
  const routes = [
    '',
    '/about',
    '/schedule',
    '/events',
    '/submit',
    '/register',
    '/contact',
    '/guidelines',
    '/presenters',
    '/organizers',
    '/supporters',
    '/privacy',
    '/terms',
    '/thanks',
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }))

  // Include public events in sitemap
  try {
    const { prisma } = await import('@/lib/db')
    const events = await prisma.event.findMany({
      where: { status: { in: ['SCHEDULED', 'COMPLETED'] } },
      orderBy: { scheduledAt: 'desc' },
      select: { id: true, updatedAt: true },
    })
    const eventEntries: MetadataRoute.Sitemap = events.map((e) => ({
      url: `${baseUrl}/events/${e.id}`,
      lastModified: e.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))
    return [...staticEntries, ...eventEntries]
  } catch {
    return staticEntries
  }
}
