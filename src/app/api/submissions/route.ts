import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail, getAdminEmails } from '@/lib/email'
import { generateSubmissionConfirmationEmail } from '@/lib/email-templates/submission-confirmation'
import { generateAdminAlertEmail } from '@/lib/email-templates/admin-alert'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const submission = await prisma.submission.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorAffiliation: data.authorAffiliation,
        authorBio: data.authorBio || null,
        coAuthors: data.coAuthors || null,
        researchField: data.researchField,
        methodology: data.methodology || null,
        keywords: data.keywords,
        isPublished: Boolean(data.isPublished),
        presentationPreference: data.presentationPreference || null,
        availabilityNotes: data.availabilityNotes || null,
        status: 'PENDING'
      }
    })

    // Send confirmation email to author
    const confirmationHtml = generateSubmissionConfirmationEmail({
      id: submission.id,
      title: submission.title,
      authorName: submission.authorName,
      submittedAt: submission.submittedAt
    })
    
    await sendEmail({
      to: submission.authorEmail,
      subject: 'APOSS Submission Received - ' + submission.title,
      html: confirmationHtml
    })

    // Send alert email to admins
    const adminAlertHtml = generateAdminAlertEmail({
      id: submission.id,
      title: submission.title,
      abstract: submission.abstract,
      authorName: submission.authorName,
      authorEmail: submission.authorEmail,
      authorAffiliation: submission.authorAffiliation,
      researchField: submission.researchField,
      methodology: submission.methodology || '',
      keywords: submission.keywords,
      submittedAt: submission.submittedAt
    })
    
    await sendEmail({
      to: getAdminEmails(),
      subject: `New APOSS Submission: ${submission.title}`,
      html: adminAlertHtml,
      replyTo: submission.authorEmail
    })

    return NextResponse.json({ 
      success: true, 
      submissionId: submission.id,
      message: 'Submission received successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit proposal' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { submittedAt: 'desc' },
      select: {
        id: true,
        title: true,
        authorName: true,
        authorEmail: true,
        authorAffiliation: true,
        authorBio: true,
        coAuthors: true,
        researchField: true,
        methodology: true,
        keywords: true,
        isPublished: true,
        presentationPreference: true,
        availabilityNotes: true,
        status: true,
        submittedAt: true,
        reviewedAt: true,
        scheduledAt: true
      }
    })

    return NextResponse.json({ success: true, submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch submissions' 
    }, { status: 500 })
  }
}
