export const ErrorInterceptor = (error: any) => {
  console.error("Request Error:", error);
  return Promise.reject(error);
};
