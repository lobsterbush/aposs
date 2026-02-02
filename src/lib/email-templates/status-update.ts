interface StatusUpdateData {
  authorName: string
  title: string
  status: 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'SCHEDULED'
  reviewerComments?: string
  scheduledAt?: Date
  zoomJoinUrl?: string | null
}

export function generateStatusUpdateEmail(data: StatusUpdateData): string {
  let statusMessage = ''
  let statusColor = ''
  let nextSteps = ''

  switch (data.status) {
    case 'UNDER_REVIEW':
      statusColor = '#2563eb'
      statusMessage = 'Your submission is now under review'
      nextSteps = `
        <p>Our organizing team is currently reviewing your submission. We will notify you of our decision within 2-3 business days.</p>
        <p>During this time, we are:</p>
        <ul>
          <li>Evaluating the fit with our seminar series scope</li>
          <li>Assessing the research contribution and methodology</li>
          <li>Identifying potential discussants for your work</li>
        </ul>
      `
      break
    
    case 'ACCEPTED':
      statusColor = '#16a34a'
      statusMessage = 'Congratulations! Your submission has been accepted'
      nextSteps = `
        <p><strong>We are pleased to inform you that your submission has been accepted for presentation at APOSS!</strong></p>
        <p>Next steps:</p>
        <ul>
          <li>We will work with you to find a suitable date for your presentation</li>
          <li>You'll be asked to provide your paper at least 7 days before the scheduled date</li>
          <li>We will assign 2-3 discussants who will provide feedback on your work</li>
          <li>You'll give a 10-minute presentation followed by discussion</li>
        </ul>
        <p>We will be in touch soon with scheduling options. Thank you for your contribution to our community!</p>
      `
      break
    
    case 'REJECTED':
      statusColor = '#dc2626'
      statusMessage = 'Update on your submission'
      nextSteps = `
        <p>After careful consideration, we regret to inform you that we are unable to schedule your paper for presentation at this time.</p>
        ${data.reviewerComments ? `
          <div style="background: #f9fafb; border-left: 4px solid #6b7280; padding: 15px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #374151;">Reviewer Comments</h4>
            <p style="margin: 0; color: #4b5563; white-space: pre-wrap;">${data.reviewerComments}</p>
          </div>
        ` : ''}
        <p>This decision does not reflect on the quality of your research. Our capacity is limited, and we receive more excellent submissions than we can accommodate.</p>
        <p>We encourage you to:</p>
        <ul>
          <li>Submit your work to other academic venues and workshops</li>
          <li>Consider resubmitting to APOSS in the future after significant revisions</li>
          <li>Continue attending our seminars and engaging with our community</li>
        </ul>
        <p>Thank you for considering APOSS for your work.</p>
      `
      break
    
    case 'SCHEDULED':
      statusColor = '#7c3aed'
      statusMessage = 'Your presentation has been scheduled!'
      const scheduledDate = data.scheduledAt ? data.scheduledAt.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      }) : 'TBD'
      const zoomBlock = data.zoomJoinUrl
        ? `<p style="margin: 16px 0 4px 0;"><strong>Zoom:</strong> <a href="${data.zoomJoinUrl}" style="color:#7c3aed;">Join meeting</a></p>`
        : `<p style="margin: 16px 0 4px 0; color:#4b5563;">Zoom link will follow once confirmed.</p>`
      nextSteps = `
        <p><strong>Your seminar presentation is scheduled for:</strong></p>
        <div style="background: #f3f4f6; border: 2px solid #7c3aed; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <p style="font-size: 18px; font-weight: 600; color: #7c3aed; margin: 0;">${scheduledDate}</p>
          ${zoomBlock}
        </div>
        
        <p><strong>What you need to do:</strong></p>
        <ol>
          <li><strong>Send your latest paper:</strong> Please email your PDF at least 7 days before the date so we can circulate to discussants.</li>
          <li><strong>Prepare a 10-minute presentation:</strong> Focus on your main argument, methods, and findings.</li>
          <li><strong>Join on time:</strong> Use the Zoom link above; we start promptly.</li>
          <li><strong>Engage with discussants:</strong> Expect comments followed by open discussion.</li>
        </ol>
        
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #1e40af;">
            <strong>Tip:</strong> Keep slides lean; spend more time on puzzles where feedback helps most.
          </p>
        </div>
        
        <p>We look forward to your presentation!</p>
      `
      break
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Submission Status Update</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00376c 0%, #17152b 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">APOSS</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">Asian Politics Online Seminar Series</p>
      </div>
      
      <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <div style="background: ${statusColor}; color: white; padding: 15px 20px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
          <h2 style="margin: 0; font-size: 20px;">${statusMessage}</h2>
        </div>
        
        <p>Dear ${data.authorName},</p>
        
        <p>We are writing to update you on the status of your submission:</p>
        
        <div style="background: #f9fafb; border-left: 4px solid ${statusColor}; padding: 15px; margin: 20px 0;">
          <p style="margin: 0;"><strong>Paper Title:</strong> ${data.title}</p>
        </div>
        
        ${nextSteps}
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
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
