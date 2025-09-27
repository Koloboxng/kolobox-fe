// Email helper utility for dynamic verification URLs
export const getVerificationUrl = (token, referrerHost = null) => {
  // Use referrer host if provided, otherwise fallback to default
  const baseUrl = referrerHost || 'https://kolobox.ng'
  return `${baseUrl}/verify?token=${token}`
}

export const getVerificationCode = () => {
  // Generate 5-digit verification code
  return Math.floor(10000 + Math.random() * 90000).toString()
}