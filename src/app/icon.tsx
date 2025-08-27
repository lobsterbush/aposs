import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            background: 'url("/branding/Drop logo ht 2000px.png") center/contain no-repeat',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
