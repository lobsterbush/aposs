import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, affiliation, interests } = data || {}

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const dir = path.join(process.cwd(), 'tmp')
    try { await fs.mkdir(dir, { recursive: true }) } catch {}
    const file = path.join(dir, 'registrations.json')

    let existing: Array<{ id: string; name: string; email: string; affiliation: string; interests: string; createdAt: string }> = []
    try {
      const raw = await fs.readFile(file, 'utf8')
      existing = JSON.parse(raw)
    } catch {
      existing = []
    }

    existing.push({
      id: String(Date.now()),
      name,
      email,
      affiliation: affiliation || '',
      interests: interests || '',
      createdAt: new Date().toISOString(),
    })

    await fs.writeFile(file, JSON.stringify(existing, null, 2), 'utf8')

    return NextResponse.json({ success: true })
    } catch {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }
}

