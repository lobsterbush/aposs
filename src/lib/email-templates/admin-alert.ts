interface SubmissionData {
  id: string
  title: string
  abstract: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  researchField: string
  methodology: string
  keywords: string
  submittedAt: Date
}

export function generateAdminAlertEmail(data: SubmissionData): string {
  const formattedDate = data.submittedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const adminUrl = process.env.NEXTAUTH_URL 
    ? `${process.env.NEXTAUTH_URL}/admin`
    : 'https://aposs.org/admin'

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Submission Alert</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px;">
      <div style="background: #dc2626; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">🔔 New APOSS Submission</h1>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 16px; margin-top: 0;">A new paper submission has been received and requires your review.</p>
        
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h3 style="color: #991b1b; margin-top: 0; font-size: 18px;">Submission Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; vertical-align: top; width: 140px;"><strong>Submission ID:</strong></td>
              <td style="padding: 8px 0; vertical-align: top;">${data.id}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Submitted:</strong></td>
              <td style="padding: 8px 0; vertical-align: top;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; vertical-align: top;"><strong>Title:</strong></td>
              <td style="padding: 8px 0; vertical-align: top;">${data.title}</td>
            </tr>
          </table>
        </div>
        
        <div style="background: #f9fafb; border-left: 4px solid #00376c; padding: 20px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #17152b;">Author Information</h4>
          <p style="margin: 5px 0;"><strong>Name:</strong> ${data.authorName}</p>
          <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${data.authorEmail}" style="color: #00376c;">${data.authorEmail}</a></p>
          <p style="margin: 5px 0;"><strong>Affiliation:</strong> ${data.authorAffiliation}</p>
        </div>
        
        <div style="background: #f9fafb; border-left: 4px solid #00376c; padding: 20px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #17152b;">Research Details</h4>
          <p style="margin: 5px 0;"><strong>Field:</strong> ${data.researchField}</p>
          <p style="margin: 5px 0;"><strong>Methodology:</strong> ${data.methodology}</p>
          <p style="margin: 5px 0;"><strong>Keywords:</strong> ${data.keywords}</p>
        </div>
        
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h4 style="margin-top: 0; color: #17152b;">Abstract</h4>
          <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${data.abstract}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${adminUrl}" style="display: inline-block; background: linear-gradient(135deg, #00376c 0%, #17152b 100%); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Review in Admin Dashboard →
          </a>
        </div>
        
        <div style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #92400e;">
            <strong>Action Required:</strong> Please review this submission within 2-3 business days and update the status accordingly.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          This is an automated notification from the APOSS submission system.<br>
          <a href="${adminUrl}" style="color: #00376c; text-decoration: none;">Admin Dashboard</a>
        </p>
      </div>
    </body>
    </html>
  `
}
