export const makeApiUrl = (path: string): string => {
  const apiBaseUrl = 'process.env.API_URL'
  return `${apiBaseUrl}${path}`
}
