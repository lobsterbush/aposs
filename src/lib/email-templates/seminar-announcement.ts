interface SeminarAnnouncementData {
  eventTitle: string
  presenter: string
  scheduledAt: Date
  zoomJoinUrl?: string | null
}

export function generateSeminarAnnouncementEmail(data: SeminarAnnouncementData): string {
  const formattedDate = data.scheduledAt.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const formattedTime = data.scheduledAt.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Upcoming APOSS Seminar</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 620px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #00376c 0%, #17152b 100%); padding: 28px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 26px;">APOSS Seminar Invitation</h1>
        <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0 0; font-size: 14px;">Asia Pacific Online Seminar Series</p>
      </div>

      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p>Dear colleague,</p>
        <p>You are invited to our upcoming APOSS seminar.</p>

        <div style="background: #f9fafb; border-left: 4px solid #00376c; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Title:</strong> ${data.eventTitle}</p>
          <p style="margin: 0 0 8px 0;"><strong>Presenter:</strong> ${data.presenter}</p>
          <p style="margin: 0 0 8px 0;"><strong>Date:</strong> ${formattedDate}</p>
          <p style="margin: 0;"><strong>Time:</strong> ${formattedTime}</p>
        </div>

        ${data.zoomJoinUrl ? `
          <div style="text-align: center; margin: 24px 0;">
            <a href="${data.zoomJoinUrl}" style="display: inline-block; background: #00376c; color: #ffffff; text-decoration: none; font-weight: 600; padding: 12px 24px; border-radius: 8px;">
              Join Seminar on Zoom
            </a>
          </div>
          <p style="font-size: 13px; color: #6b7280; word-break: break-word;">
            If the button does not work, use this link: <a href="${data.zoomJoinUrl}" style="color: #00376c;">${data.zoomJoinUrl}</a>
          </p>
        ` : `
          <p style="background: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px; padding: 12px; color: #92400e;">
            Zoom link will be shared shortly.
          </p>
        `}

        <p>We look forward to your participation.</p>
        <p>Best regards,<br><strong>The APOSS Team</strong></p>
      </div>
    </body>
    </html>
  `
}
