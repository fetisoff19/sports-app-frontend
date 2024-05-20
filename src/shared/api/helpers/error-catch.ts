export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message
  if (message) {
    if (typeof message === 'object') {
      return message[0]
    }
    return message
  }
  return error.message
}
