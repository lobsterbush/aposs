import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!filename.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Check if we have the blob token configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN not configured')
      return NextResponse.json(
        { error: 'File upload not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const body = request.body
    if (!body) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Generate a unique filename with timestamp
    const timestamp = Date.now()
    const cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')
    const uniqueFilename = `submissions/${timestamp}-${cleanFilename}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, body, {
      access: 'public',
      contentType: 'application/pdf',
      addRandomSuffix: true
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: cleanFilename,
      size: blob.size
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
