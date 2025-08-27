import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'APOSS - Asian Politics Online Seminar Series'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%)',
          padding: 64,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 16,
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: 'url("/branding/Drop logo ht 2000px.png") center/contain no-repeat',
              }}
            />
          </div>
          <div style={{ color: 'white', fontSize: 28, opacity: 0.9 }}>APOSS</div>
        </div>
        <div style={{ height: 28 }} />
        <div style={{ color: 'white', fontSize: 58, fontWeight: 800, lineHeight: 1.1 }}>
          Asian Politics Online Seminar Series
        </div>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 28, marginTop: 16 }}>
          Advancing Asian Politics Research
        </div>
      </div>
    ),
    { ...size }
  )
}
