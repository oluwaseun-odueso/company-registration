export const SuccessResponse = (message: string, data?: any, token?: string) => {
  return {
    status: true,
    message,
    data,
  }
}