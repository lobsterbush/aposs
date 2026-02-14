function requireEnv(key: string, missing: string[]) {
  if (!process.env[key]) missing.push(key)
}

export function validateEnv() {
  if (process.env.NODE_ENV !== 'production') return

  const missing: string[] = []
  requireEnv('DATABASE_URL', missing)
  requireEnv('NEXT_PUBLIC_SITE_URL', missing)
  requireEnv('NEXTAUTH_SECRET', missing)
  requireEnv('ADMIN_EMAIL', missing)

  const authMode = process.env.NEXT_PUBLIC_AUTH_MODE || 'email'
  if (authMode === 'credentials') {
    requireEnv('ADMIN_PASSWORD', missing)
  } else {
    requireEnv('RESEND_API_KEY', missing)
    requireEnv('EMAIL_FROM', missing)
  }

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`
    if (process.env.ENFORCE_ENV_VALIDATION === 'true') {
      throw new Error(message)
    }
    console.warn(message)
  }
}
