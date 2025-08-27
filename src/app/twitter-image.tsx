import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'APOSS - Asian Politics Online Seminar Series'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function TwitterImage() {
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
        <div style={{ color: 'white', fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
          Share your research with APOSS
        </div>
        <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 26, marginTop: 16 }}>
          Global community • Inclusive scholarship • Early career focus
        </div>
      </div>
    ),
    { ...size }
  )
}
