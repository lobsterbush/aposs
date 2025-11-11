interface SubmissionData {
  id: string
  title: string
  authorName: string
  submittedAt: Date
}

export function generateSubmissionConfirmationEmail(data: SubmissionData): string {
  const formattedDate = data.submittedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submission Confirmation</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00376c 0%, #17152b 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">APOSS</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">Asian Politics Online Seminar Series</p>
      </div>
      
      <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #00376c; margin-top: 0;">Submission Received!</h2>
        
        <p>Dear ${data.authorName},</p>
        
        <p>Thank you for submitting your research proposal to the Asian Politics Online Seminar Series. We have successfully received your submission.</p>
        
        <div style="background: #f9fafb; border-left: 4px solid #00376c; padding: 15px; margin: 25px 0;">
          <p style="margin: 0 0 10px 0;"><strong>Submission ID:</strong> ${data.id}</p>
          <p style="margin: 0 0 10px 0;"><strong>Paper Title:</strong> ${data.title}</p>
          <p style="margin: 0;"><strong>Submitted:</strong> ${formattedDate}</p>
        </div>
        
        <h3 style="color: #17152b; font-size: 18px; margin-top: 30px;">What happens next?</h3>
        
        <ol style="padding-left: 20px;">
          <li style="margin-bottom: 10px;">Our organizing team will review your submission within <strong>2-3 business days</strong>.</li>
          <li style="margin-bottom: 10px;">We will notify you by email once a decision has been made.</li>
          <li style="margin-bottom: 10px;">If accepted, we will work with you to schedule a presentation date.</li>
          <li>You'll receive an invitation to discuss the paper 7 days before your scheduled seminar.</li>
        </ol>
        
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px; margin: 25px 0;">
          <p style="margin: 0; font-size: 14px; color: #1e40af;">
            <strong>Note:</strong> We particularly encourage submissions from early-career researchers and graduate students. All methodological approaches and research stages are welcome.
          </p>
        </div>
        
        <p>If you have any questions about your submission, please don't hesitate to contact us.</p>
        
        <p style="margin-top: 30px;">Best regards,<br>
        <strong>The APOSS Organizing Team</strong><br>
        Charles Crabtree & Trevor Incerti</p>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <p style="font-size: 12px; color: #6b7280; text-align: center;">
          Asian Politics Online Seminar Series<br>
          <a href="https://aposs.org" style="color: #00376c; text-decoration: none;">aposs.org</a>
        </p>
      </div>
    </body>
    </html>
  `
}
