export const SuccessResponse = (message: string, data?: any) => {
  return {
    status: true,
    message,
    data
  }
}